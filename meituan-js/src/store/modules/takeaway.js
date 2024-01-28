import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const foodStore = createSlice({
    name: 'foods',
    initialState: {
        foodsList: [],
        activeIndex: 0,
        cartList: []
    },
    reducers: {
        setFoodsList(state, action) {
            state.foodsList = action.payload
        },
        changeActiveIndex(state, action) {
            state.activeIndex = action.payload
        },
        addCart(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count++
            } else {
                state.cartList.push(action.payload)
            }
        },
        increment(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count++
        },
        decrement(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count--
            if (item.count === 0) {
                state.cartList = state.cartList.filter(item => item.id !== action.payload.id)
            }
        },
        clearCart(state) {
            state.cartList = []
        }
    }
})

const { setFoodsList, changeActiveIndex, addCart, increment, decrement, clearCart } = foodStore.actions

const fetchFoodList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3004/takeaway')
        dispatch(setFoodsList(res.data))
    }
}
export { fetchFoodList, changeActiveIndex, addCart, increment, decrement, clearCart }


const reducer = foodStore.reducer
export default reducer