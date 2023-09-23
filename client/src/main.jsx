// ! JUST IMPORT NEEDED DEPENDENCIES

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Header from './layouts/Header'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import Techs from './pages/Techs'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import Admin from './pages/Admin'
import Blog from './pages/Blog'
import Error from './pages/Error'

const routeProviderRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: 'bloglar',
    element: <Blogs />
  },
  {
    path: 'projeler',
    element: <Projects />
  },
  {
    path: 'teknolojiler',
    element: <Techs />
  },
  {
    path: 'iletisim',
    element: <Contact />
  },
  {
    path: 'admin',
    element: <Admin />
  },
  {
    path: 'blog/:blog',
    element: <Blog />
  },
  {
    path: 'error',
    element: <Error notFound={false} />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={routeProviderRoutes} />
  </React.StrictMode>
)
