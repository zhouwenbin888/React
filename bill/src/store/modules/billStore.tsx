import { createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
export interface Bill {
    type: string,
    money: number,
    date: Date,
    useFor: string,
    id:string
}
export interface BillState {
    billList: Bill[];
}

const initialState: BillState = {
    billList: [],
};
const billstore = createSlice({
    name: "bill",
    initialState,
    reducers: {
        setBillList(state, action: PayloadAction<Bill[]>) {
            state.billList = action.payload;
        },
        addBill(state,action){
            state.billList.push(action.payload)
        }
    }
});
const getBillList: () => (dispatch: Dispatch) => Promise<void> = () => {
    return async (dispatch: Dispatch) => {
        const res = await axios.get('http://localhost:3001/ka');
        dispatch(setBillList(res.data));
    };
};

const addBillList: (data: Bill) => (dispatch: Dispatch) => Promise<void> = (data) => {
    return async (dispatch: Dispatch) => {
      const res = await axios.post('http://localhost:3001/ka', data);
      dispatch(addBill(res.data));
    };
  };
  
const reducer = billstore.reducer
const { setBillList ,addBill} = billstore.actions;


export { setBillList, getBillList ,addBill,addBillList}
export default reducer