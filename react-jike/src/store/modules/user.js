// 和用户相关的状态管理

import { createSlice } from '@reduxjs/toolkit'
import { setToken as _setToken, getToken, removeToken } from '@/utils'


const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})


// 解构出actionCreater

const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// 获取reducer函数

const userReducer = userStore.reducer

// 登录获取token异步方法封装
const fetchLogin = (loginForm) => {
  return (dispatch) => {
    var xhr = new XMLHttpRequest();

    // 配置请求
    xhr.open('POST', 'http://geek.itheima.net/v1_0/authorizations', false);  // 设置第三个参数为 false，表示同步请求
    xhr.setRequestHeader('Content-Type', 'application/json');

    // 发送请求
    xhr.send(JSON.stringify(loginForm));

    // 处理响应
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      dispatch(setToken(response.data.token));
    } else {
      console.error('请求失败', xhr.statusText);
    }
  }
}

// 获取个人用户信息异步方法
const fetchUserInfo = () => {
  return (dispatch) => {
    const token = getToken();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://geek.itheima.net/v1_0/user/profile', false);  // 注意这里设置为同步请求
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send();

    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      dispatch(setUserInfo(response.data));
    } else {
      // 处理错误
    }

  }
}

export { fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer