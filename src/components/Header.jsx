import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './ecom/Navigation';
class Header extends Component {
     state = { cartCount: 0 }
    render () {
        return (
            <header className="ui header">
                <div className="ui secondary pointing menu" >
                <div className="left menu">
                    <Link to={`/`} >
                        <span className="ui item">
                        SHOPMATE
                        </span>
                    </Link>
                </div>
                <Navigation /> 
                <div className="right menu">
                    <div className="ui search">
                        <div className="ui icon input">
                            <input className="prompt" type="text" placeholder="Search..." />
                            <i className="search icon"></i>
                        </div>
                    </div>
                    <div className="bag">
                        <Link to={`/ecom/cartPage`} >
                            <p>{ this.state.cartCount }</p>
                            <p><i className='icon shop'></i></p>
                        </Link>
                    </div>
                </div>
            </div> 
              
            </header>
        );
    }
};
export default Header;