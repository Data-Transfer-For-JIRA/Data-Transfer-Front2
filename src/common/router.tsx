import App from "../App";
import ErrorPage from "@pages/ErrorPage";
import LoginPage from "@pages/LoginPage";
import MainPage from "@pages/MainPage";
import ProjectCreatePage from '@pages/ProjectCreatePage';
import ProjectDetailPage from '@pages/ProjectDetailPage';
import ProjectFixedDetail from '@pages/ProjectFixedDetail';
import ProjectLinkPage from '@pages/ProjectLinkPage';
import Test from "@tests/Test";

export const Router = [
  {
    path: "/",
    element: <App />,
    errorElement: <div>error</div>,
    children: [
      { index: true, element: <MainPage fixFlag={false} /> },
      { path: "projectDetail/:jiraProjectCode", element: <ProjectDetailPage /> },
      { path: "projectCreate", element: <ProjectCreatePage /> },
      { path: "projectLink", element: <ProjectLinkPage /> },
      { path: "projectFix", element: <MainPage fixFlag={true} /> },
      { path: "projectFix/:jiraProjectCode", element: <ProjectFixedDetail/> },
      { path: "projectDelete", element: <ErrorPage /> },
      { path: "deleteStay", element: <ErrorPage /> },
      { path: "/Login", element: <LoginPage /> },
      { path: "/ComponentTest", element: <Test /> },
    ],
  },
];
