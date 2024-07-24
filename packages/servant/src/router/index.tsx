import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Root from "~/pages/Root/index";
import ServiceNode from "~/pages/ServiceNode";
import ServiceNodeActive from "~/pages/ServiceNode/ServiceNodeActive";
import ServiceNodeDetail from "~/pages/ServiceNode/ServiceNodeDetail";
import Fund from "~/pages/Fund";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/service",
        children: [
          {
            path: "/service",
            element: <ServiceNode />,
          },
          {
            path: "/service/active",
            element: <ServiceNodeActive />,
          },
          {
            path: "/service/detail/:id",
            element: <ServiceNodeDetail />,
          },
        ],
      },
      {
        path: "/fund",
        element: <Fund />,
      },
      {
        path: "/plan",
        element: null,
      },
    ],
  },
]);

export { router as default };
