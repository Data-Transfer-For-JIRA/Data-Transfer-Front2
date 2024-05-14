import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Router } from "@common/router";

const router = createBrowserRouter(Router);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
