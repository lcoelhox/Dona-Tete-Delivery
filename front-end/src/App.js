import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Admin from './pages/Admin/Admin';
import Login from './pages/Common/Login';
import Register from './pages/Common/Register';
import Checkout from './pages/Customer/Checkout';
import Products from './pages/Customer/Products';
import Orders from './pages/Shared/Orders';
import OrdersDetails from './pages/Shared/OrdersDetails';

function App() {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Navbar>
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/orders" component={ Orders } />
        <Route exact path="/customer/orders/:id" component={ OrdersDetails } />
        <Route exact path="/seller/orders" component={ Orders } />
        <Route exact path="/seller/orders/:id" component={ OrdersDetails } />
        <Route exact path="/admin/manage" component={ Admin } />
      </Navbar>
    </Switch>
  );
}

export default App;
