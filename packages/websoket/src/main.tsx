import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@ignt/react-library/dist/style.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

import "./index.css";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(duration);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense>
    <Provider>
        <QueryClientProvider client={queryClient}>          
            <RouterProvider router={router} />
        </QueryClientProvider>
    </Provider>
  </Suspense>,
);
