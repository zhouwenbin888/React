import { request } from '@/utils'
import React, { useEffect } from 'react'

const Layout = () => {
  useEffect(()=>{
request.get('user/profile')
  },[])
  return (
    <div>Layout</div>
  )
}

export default Layout