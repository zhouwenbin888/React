import { logindata } from "@/pages/Login";
import { removeToken} from "@/utils";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from "@/utils";
import { getProfileAPI, loginAPI } from "@/apis/user";
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
        user:{} as User
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUser(state,action){
            state.user=action.payload
        },
        exitUser(state){
            state.token=''
            state.user={} as User
            removeToken()
        }
    }
})

const fetchLogin: (loginForm: logindata) => (dispatch: Dispatch) => Promise<void> = (loginForm) => {
    return async (dispatch: Dispatch) => {
        const res = await loginAPI(loginForm)
        dispatch(setToken(res.data.token))
    }
}

const fetchUser: () => (dispatch: Dispatch) => Promise<void> = () => {
    return async (dispatch: Dispatch) => {
      const res= await getProfileAPI()
      dispatch(setUser(res.data))
    }
}

const { setToken ,setUser,exitUser} = userStore.actions

const userReducer = userStore.reducer

export { setToken, fetchLogin ,setUser,fetchUser,exitUser}
export default userReducer