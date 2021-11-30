import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product/productSlice.js'
import cartReducer from './cart/cartSlice.js'
import userReducer from './user/userSlice.js'


export const store = configureStore({
    reducer: {
        products: productReducer,
        carts: cartReducer,
        user: userReducer,
    },
})