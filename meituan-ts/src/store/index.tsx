import reducer from "./modules/takeaway";
import { configureStore } from "@reduxjs/toolkit";

const store=configureStore({
    reducer:{
        foods:reducer
    }
})
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store