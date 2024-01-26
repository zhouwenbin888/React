import { configureStore } from "@reduxjs/toolkit";
import billReducer from './modules/billStore'

const store=configureStore(
    {
        reducer:{
            bill:billReducer
        }
    }
)
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store