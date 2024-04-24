import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Router } from './Common/Router'
import { CustomDarkModeProvider } from './Context/CustomDarkmodeProvider';

const router = createBrowserRouter(Router);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CustomDarkModeProvider>
    <RouterProvider router={router} />
  </CustomDarkModeProvider>

)
