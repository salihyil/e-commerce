import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';




export const getUsersLoginAsync = createAsyncThunk('user/getUsersLoginAsync/', async (user) => {
    //createAsyncThunk 2 parametre 1. action name, 2.parametre async çağrım işlemi yapmak
    //console.log("user", user); //user {email: 'a@a.com', password: '1234567'} ne submit ettiysem burada geliyor 


    let mockUser = {
        email: "a@a.com",
        password: "123456",
        name: "salih",
        surname: "Yılmaz"
    };


    return new Promise(await function (resolve, reject) {
        setTimeout(function () {
            axios.post('http://localhost:7001/users/login', user)
                .then(function (response) {
                    console.log(" response.data: ", response.data); //{email: 'a@a.com', password: '123456'}

                    if (response.data.email === mockUser.email && response.data.password === mockUser.password) {
                        resolve({ code: 0, user: mockUser, token: "jwt-tokeim" });
                    }
                    else {
                        resolve({ code: 1, errorMessage: "Kullanıcı adı veya şifre hatalı" });
                    }
                })
        }, 3000)
    })

    //./data.json'
    //console.log("response", response.status);
    //console.log("response.data", response.data); //response.data {email: 'asd@ac.om', password: '1234567587'}

    /*   if (user.email === mockUser.email && user.password === "123456") {
  
    } */
    //return response.data;
});


/* export const getUsersLogoutAsync = createAsyncThunk('user/getUsersLogoutAsync/', async () => {
    //userLogout oldugunda bu apiden veri gelecek.


}); */


//let state = localStorage.getItem("user") === null ? {} : { user: JSON.parse(localStorage.getItem("user")) };

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        errorMessage: null,
        insigninOparation: false,
    },
    reducers: {
        startLogin: (state, action) => {
            state.insigninOparation = true;
        },
        endLogin: (state, action) => {
            state.insigninOparation = false;
        },
        removeError: (state, action) => {
            state.errorMessage = null;
        }
    },
    extraReducers: {

        [getUsersLoginAsync.fulfilled]: (state, action) => {
            console.log("state: ", current(state));
            console.log("action.payload: ", action.payload); //{code: 1, errorMessage: 'Kullanıcı adı veya şifre hatalı'}
            console.log("Veriler geldi.");
            //debugger;

            state.insigninOparation = false;

            if (action.payload.code === 0) { //code 0 ise login basarılı
                localStorage.setItem("user", JSON.stringify(action.payload.token)) //json'ı stringe çevirdik.

                window.location.href = "/"; //anasayfaya yonlendir

            } else { //code 1 ise login başarısız actionları gider.

                state.errorMessage = action.payload.errorMessage;
            }
        },




    }
});


export const errorMessages = (state) => state.user.errorMessage;
export const insigninOparation = (state) => state.user.insigninOparation;


export const { endLogin, startLogin, removeError } = userSlice.actions;
export default userSlice.reducer;