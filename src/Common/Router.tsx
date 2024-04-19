import App from '../App';
import LoginPage from '../components/Pages/LoginPage';
import MainPage from '../components/Pages/mainPage';
import Test from '../components/Test/Test';

export const Router = [
  {
    path: '/',
    element: <App />,
    errorElment: <div>error</div>,
    children: [
      { index: true, element: <MainPage /> },
    ]
  },
  {
    path: '/Login',
    element: <LoginPage />,
    errorElment: <div>error</div>,
  },
  {
    path: '/ComponentTest',
    element: <Test />
  }
]
