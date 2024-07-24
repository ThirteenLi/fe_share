import { createBrowserRouter } from "react-router-dom";

import Root from "~/pages/Root/index";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Root />,
  },
]);

export { router as default };
