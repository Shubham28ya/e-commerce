import { createSlice } from "@reduxjs/toolkit";


const Cartslice = createSlice({
    name:'cart',
    initialState: {
        items: [],
        items1:[],
        count:1,
        items2:[],     
        item3:[]  ,
        address:[]
    },
    reducers:{
        addItem: (state,action)=>{
        state.items.push(action.payload)
        },
        addwish:(state,action)=>{
state.items1.push(action.payload)
        },
        removeItem:(state,action)=>{
            state.items.splice(action.payload,1)
        },
        removeItemWish:(state,action)=>{
            state.items1.splice(action.payload,1)
        },
        clearCart:(state)=>{
            state.items=[]
        },
        increment:(state,action)=>{
const item = state.items.find(item => item.id === action.payload);
if (item) {
    item.quantity += 1;
}
},
        decrement:(state,action)=>{
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

addCrousel:(state,action)=>{
    state.items2.push(action.payload)
    
},
addEmail:(state,action)=>{
state.item3.push(action.payload)
},
addAddress:(state,action)=>{
state.address = action.payload
}
}


})
export const {addItem,addwish, increment,decrement,addCrousel,removeItem,removeItemWish,addEmail,addAddress} = Cartslice.actions;
export default Cartslice.reducer;



