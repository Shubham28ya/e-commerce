import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
// import WishlistSlice from "./WishlistSlice";
const Store = configureStore({
     reducer:{
         cart: CartSlice,
        //  wishlist:WishlistSlice,
         
     }
     
})

export default Store;