import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Cart from './components/Cart';

function App() {
  return (
    <div  >
      <Router>
        <ToastContainer />
        <PrivateRoute path="/" exact Component={HomePage}></PrivateRoute>
        <PrivateRoute path="/cart" exact Component={Cart}></PrivateRoute>
        <Route path="/login" >
          <SignIn />
        </Route>
      </Router>
    </div>
  );
}

export default App;
