import App from '../App';
import MainPage from '../components/Pages/mainPage';

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
    path: '/ComponentTest',
    element: <div></div>
  }
]
