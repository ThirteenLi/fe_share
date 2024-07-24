import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import enUS from "@arco-design/web-react/es/locale/en-US";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@ignt/react-library/dist/style.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import { ConfigProvider } from "@arco-design/web-react";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmiConfig";

import "./index.css";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(duration);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense>
    <Provider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            locale={enUS}
            tablePagination={{
              sizeCanChange: true,
              sizeOptions: [10, 15, 20, 25, 30, 40, 50],
            }}
          >
            <RouterProvider router={router} />
          </ConfigProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  </Suspense>,
);
