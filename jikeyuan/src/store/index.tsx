import { configureStore } from "@reduxjs/toolkit";
import userReducer from './module/user'

const store=configureStore(
    {
        reducer:{
            user:userReducer
        }
    }
)
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store