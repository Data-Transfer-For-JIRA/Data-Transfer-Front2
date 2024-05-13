import App from "../App";
import ErrorPage from "../components/Pages/ErrorPage";
import LoginPage from "../components/Pages/LoginPage";
import MainPage from "../components/Pages/MainPage";
import Test from "../components/test/Test";

export const Router = [
  {
    path: "/",
    element: <App />,
    errorElement: <div>error</div>,
    children: [
      { index: true, element: <MainPage /> },
      { path: "projectDetail", element: <MainPage /> },
      { path: "projectCreate", element: <LoginPage /> },
      { path: "projectFix", element: <ErrorPage /> },
      { path: "projectDelete", element: <ErrorPage /> },
      { path: "deleteStay", element: <ErrorPage /> },
      { path: "/Login", element: <LoginPage /> },
      { path: "/ComponentTest", element: <Test /> },
    ],
  },
];
