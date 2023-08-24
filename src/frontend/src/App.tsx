import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import './assets/custom.scss';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
]);

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
