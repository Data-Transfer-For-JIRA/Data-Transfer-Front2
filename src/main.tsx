import ReactDOM from "react-dom/client";
import "module-alias/register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Router } from "@Common/Router";

const router = createBrowserRouter(Router);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
