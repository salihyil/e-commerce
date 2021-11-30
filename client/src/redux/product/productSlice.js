import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../utils/api';


export const getProductsAsync = createAsyncThunk('product/getProductsAsync/', async () => {
    //createAsyncThunk 2 parametre 1. action name, 2.parametre async çağrım işlemi yapmak
    const response = await api.get("/products")
    //axios('http://localhost:7001/products'); //./data.json'

    //console.log("getProductsAsync response:", response); {data: Array(7), status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
    return response.data;
});

export const getCategoriesAsync = createAsyncThunk('product/getCategoriesAsync/', async () => {
    //createAsyncThunk 2 parametre 1. action name, 2.parametre async çağrım işlemi yapmak
    const response = await api.get("/categories")
    //axios('http://localhost:7001/categories'); //./data.json'
    //console.log("getProductsAsync response:", response); {data: Array(7), status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
    return response.data;
});

export const productSlice = createSlice({
    name: 'product',  //burada name anlamı state'e ulaşmak istediğin zaman state.product gibi. state'in bir key gibi.
    initialState: {
        allProducts: [],
        allCategories: [],
        isLoading: false,
        allProductsNotFiltered: [],

    },
    reducers: {
        filteredCategories: (state, action) => {
            const categoryName = action.payload;//kategori isim(ayakkabi, elbise) gelir

            state.allProducts = state.allProductsNotFiltered.filter(item => item.categoryName === categoryName);

        },
        sortProducts: (state, action) => {
            const sortBy = action.payload;
            state.allProducts.sort((a, b) => {
                if (sortBy === 'lowest') {
                    return b.amount - a.amount;
                }
                else {
                    return a.amount - b.amount;
                }
            });
        },
    },
    extraReducers: {

        //getProductsAsync-start
        [getProductsAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getProductsAsync.fulfilled]: (state, action) => {
            state.allProducts = action.payload;
            state.allProductsNotFiltered = action.payload;
            state.isLoading = false;
        },


        //getCategoriesAsync-start
        [getCategoriesAsync.fulfilled]: (state, action) => {
            state.allCategories = action.payload;
            state.isLoading = false;
        },

    }
});

//selectors
export const allCategories = state => state.products.allCategories;
export const allProducts = state => state.products.allProducts;
export const filteredCate = state => state.products.filteredCate;

export const selectIsLoading = (state) => { //loading ekrana yazdırma
    //console.log("selectIsLoading:", state); //{products: {…}, carts: {…}}
    /* carts: {cartItems: Array(1), cartTotalQuantity: 0, cartTotalAmount: 0}
        products: {allProducts: Array(8), isLoading: false} 
    */
    if (state.products.isLoading) {
        return <div className="productSlice-loading">Loading...</div>
    }
};


export const { filteredCategories, sortProducts } = productSlice.actions;
export default productSlice.reducer;