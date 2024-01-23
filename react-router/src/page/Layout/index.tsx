import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>Layout

        <Link to={'/'}>面板</Link>
        <Link to={'/about'}>关于</Link>
        <Outlet/>
    </div>
  )
}

export default Layout