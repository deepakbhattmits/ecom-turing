import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from '../history';
import CategoryPage from './ecom/CategoryPage';
import Header from './Header';
import Footer from './Footer';
import MainPage from './ecom/MainPage';
import CartPage from './ecom/CartPage';
import ProdDetails from './ecom/ProdDetails';
import ReviewPage from './ecom/ReviewPage';
class App extends Component {
 
  render() {
    return (
        <div className="ui container">
         
            <Router history={ createBrowserHistory } >
                
                <Header />
                    <Switch>
                      <Route path="/" exact component={ MainPage } />             
                      <Route path="/ecom/categories/:id" component={ CategoryPage } />
                      <Route path="/ecom/cartPage"  component={ CartPage } />
                      <Route path="/ecom/prodDetails/:id"  component={ ProdDetails } />
                      <Route path="/ecom/ReviewPage/:id" component={ ReviewPage } />
                    </Switch>
                <Footer />
                
            </Router>
        </div>
    );
  }
};

export default App;
