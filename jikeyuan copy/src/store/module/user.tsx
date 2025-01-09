import { logindata } from "@/pages/Login";
import { removeToken } from "@/utils";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from "@/utils";
import axios from "axios";
interface User {
    id: string;
    photo: string;
    name: string;
    mobile: string;
    gender: number;
    birthday: string;
    intro: string | null;
}
const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
        user: {} as User
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUser(state, action) {
            state.user = action.payload
        },
        exitUser(state) {
            state.token = ''
            state.user = {} as User
            removeToken()
        }
    }
})

const fetchLogin: (loginForm: logindata) => (dispatch: Dispatch) => void = (loginForm) => {
    return (dispatch: Dispatch) => {
        axios.post('http://geek.itheima.net/v1_0/authorizations', loginForm).then(res => {
            dispatch(setToken(res.data.data.token))
        })
    }
}

const fetchUser: () => (dispatch: Dispatch) => void = () => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return (dispatch: Dispatch) => {
        axios.get('http://geek.itheima.net/v1_0/user/profile', config).then(res =>
            dispatch(setUser(res.data.data))
        )

    }
}

const { setToken, setUser, exitUser } = userStore.actions

const userReducer = userStore.reducer

export { setToken, fetchLogin, setUser, fetchUser, exitUser }
export default userReducer