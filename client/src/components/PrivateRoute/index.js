import React from 'react'
import { Route, Redirect } from 'react-router-dom';


export default function PrivateRoute({ Component, ...rest }) {
    return (
        <Route {...rest}>
            {
                localStorage.getItem("user") ? <Component ></Component> : <Redirect to="/login"></Redirect>
            }
        </Route>
    )
}