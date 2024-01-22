import reducer from "./modules/takeaway";
import { configureStore } from "@reduxjs/toolkit";

const store=configureStore({
    reducer:{
        foods:reducer
    }
})

export default store