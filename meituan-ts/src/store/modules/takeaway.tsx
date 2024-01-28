import { Dispatch, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Takeaway {
    tag: string;
    name: string;
    foods: Food[];
}

export interface Food {
    id: number;
    name: string;
    like_ratio_desc: string;
    month_saled: number;
    unit: string;
    food_tag_list: string[];
    price: number;
    picture: string;
    description: string;
    tag: string;
    count: number;
}

export interface FoodState {
    foodsList:Takeaway[];
    activeIndex: number;
    cartList: Food[];
}
interface IncrementPayload {
    id: number;
  }
  
interface DecrementPayload {
    id: number;
  }
const foodStore = createSlice({
    name: 'foods',
    initialState: {
        foodsList: [],
        activeIndex: 0,
        cartList: []
    } as FoodState,
    reducers: {
        setFoodsList(state, action: PayloadAction<Takeaway[]>) {
            state.foodsList = action.payload
        },
        changeActiveIndex(state, action: PayloadAction<number>) {
            state.activeIndex = action.payload
        },
        addCart(state, action: PayloadAction<Food>) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count++
            } else {
                state.cartList.push(action.payload)
            }
        },
        increment(state, action: PayloadAction<IncrementPayload>) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count++
            }
        },
        decrement(state, action: PayloadAction<DecrementPayload>) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count--
                if (item.count === 0) {
                    state.cartList = state.cartList.filter(item => item.id !== action.payload.id)
                }
            }
        },
        clearCart(state) {
            state.cartList = []
        }
    }
})

const { setFoodsList, changeActiveIndex, addCart, increment, decrement, clearCart } = foodStore.actions

const fetchFoodList : () => (dispatch: Dispatch) => Promise<void> = ()  => {
    return async (dispatch: Dispatch) => {
        const res = await axios.get('http://localhost:3004/takeaway')
        dispatch(setFoodsList(res.data))
    }
}

export { fetchFoodList, changeActiveIndex, addCart, increment, decrement, clearCart }

const reducer = foodStore.reducer
export default reducer