import App from '../App';
import ErrorPage from '../components/Pages/ErrorPage';
import LoginPage from '../components/Pages/LoginPage';
import MainPage from '../components/Pages/MainPage';
import Test from '../components/Test/Test';

export const Router = [
  {
    path: '/',
    element: <App />,
    errorElment: <div>error</div>,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'projectDetail', element: <MainPage /> },
      { path: 'projectCreate', element: <LoginPage /> },
      { path: 'projectFix', element: <ErrorPage /> },
      { path: 'projectDelete', element: <ErrorPage /> },
      { path: 'deleteStay', element: <ErrorPage /> },
    ]
  },
  {
    path: '/Login',
    element: <LoginPage />,
    errorElment: <div>error</div>,
  },
  {
    path: '/Error',
    element: <ErrorPage />,
    errorElment: <div>error</div>,
  },
  {
    path: '/ComponentTest',
    element: <Test />
  }
]
