import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import enUS from "@arco-design/web-react/es/locale/en-US";
import { Provider } from "jotai";
import "@ignt/react-library/dist/style.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import { ConfigProvider } from "@arco-design/web-react";

import "./index.css";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(duration);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense>
    <Provider>
      <ConfigProvider
        locale={enUS}
        tablePagination={{
          sizeCanChange: true,
          sizeOptions: [10, 15, 20, 25, 30, 40, 50],
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </Suspense>,
);
