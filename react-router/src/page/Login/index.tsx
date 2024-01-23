import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate=useNavigate()
   
    return (
        <div>我是登录页
            <Link to='/article'>跳转到文章页</Link>
            <button onClick={()=>navigate('/article')}>跳转</button>
            <button onClick={()=>navigate('/article?id=10086&name=jack')}>searchparams</button>
            <button onClick={()=>navigate('/article/1001/jack')}>params</button>
        </div>
    )
}

export default Login