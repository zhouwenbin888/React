import { configureStore } from "@reduxjs/toolkit"
import reducer1 from "./modules/counterStore"
import reducer2 from "./modules/channelStore"

const store=configureStore({
    reducer:{
        counter:reducer1,
        channel:reducer2
    }
})

export default store