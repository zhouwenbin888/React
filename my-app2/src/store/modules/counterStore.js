import {createSlice} from '@reduxjs/toolkit'

const counterStore= createSlice({
    name:'counter',
    initialState:{
        count:0
    },
    reducers:{
        increment(state){
            state.count++
        },
        decrement(state){
            state.count--
        },
        addToNum(state,action){
      state.count=action.payload
        }
    }
})
const {increment,decrement,addToNum}=counterStore.actions
const reducer=counterStore.reducer
export {increment,decrement,addToNum}
export default reducer
