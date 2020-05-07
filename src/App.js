import React, { Component } from 'react';
import { Route,Redirect,Switch } from 'react-router-dom';
import './App.css';
import Movies from './components/movie';
import Customers from './components/customer';
import Rentals from './components/rentals';
import NotFound from './components/notfound';
import NavBar from './components/navbar';
import Login from './components/loginform';

class App extends Component {
  
  render() { 
    return ( 
      <div>
      <NavBar/>
      <div className="container">
          <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/movies" component={Movies}></Route>
        <Route path="/customer" component={Customers}></Route>
        <Route path="/notfound" component={NotFound}></Route>
        <Route path="/rentals" component={Rentals}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/notfound"/>
          </Switch>
        </div>
        </div>
        
     );
  }
}
 
export default App;


