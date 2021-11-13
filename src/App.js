import React, { useState,useEffect } from 'react';

import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login'

import { BrowserRouter as Router, Switch ,Route} from "react-router-dom"
import {auth} from  './firebase';
import {useStateValue} from './StateProvider'
import Paymnet from './Payment'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


const promise=loadStripe(
  'pk_test_51Jv0d2SGHfNRxAOB2vd1VxggoPaJNbOPO3titgIqDtKY0K9LxCXOsETY8NChffJNDVQpNxK4wMjmvvFonE09x3m1001J4GreLb');






function App() {

  const[{}, dispatch] =useStateValue();
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    
      <Router>
        <div className="app">
        
        
        <Switch>
        <Route path="/login">
          <Login />
          </Route>
        
          <Route path='/Checkout'>
          <Header />
          <Checkout />
          </Route>
          <Route path='/payment'>
          <Header />
          <Elements stripe={promise}>
          <Paymnet />
          </Elements>
          </Route>
          <Route path="/">
          <Header />
            <Home />
          </Route>
          </Switch>

              
        
       
        </div>
      </Router>
  
  );
}

export default App


          
       
       
      
           
         
     