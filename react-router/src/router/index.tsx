import Login from "../page/Login";
import Article from "../page/Article";

import { createBrowserRouter,createHashRouter } from "react-router-dom";
import Layout from "../page/Layout";
import Board from "../page/Board";
import About from "../page/About";
import Notfound from "../page/Notfound";

const router = createHashRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index:true,
                element: <Board />
            },
            {
                path: 'about',
                element: <About />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: 'article/:id/:name',
        element: <Article />
    },
    {
        path:'*',
        element:<Notfound/>
    }
])

export default router