import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import Navigation from './ecom/Navigation';
import { searchQuery } from '../actions' 
class Header extends Component {
     state = { cartCount: 0 }
     queryString = ( e ) => {
         console.log('test : ',e.target.value);
         this.props.searchQuery( e.target.value);
     }
     select = () => {
    // this.props.selectedProd 
    }
     renderResults = () => {
             if(!this.props.searchResult.rows) {
             return <div></div>;
         }
    
         // const imgURL = require(`../assets/product_images`);
        return this.props.searchResult.rows.map(( result, i ) => {
            return (
                    <Link to={`/ecom/prodDetails/${ result.product_id }`} className="result" key={ i } id={ result.product_id} onClick={this.select}>
                        <div className="image">
                            <img src={ require(`../assets/product_images/${ result.thumbnail }`) } alt={ result.thumbnail } />
                        </div>
                        <div className="content">
                        <div className="price">{ result.discounted_price }</div>
                        <div className="title">{ result.name }</div>
                        <div className="description">{ `${result.description.substring(0, 35)}...` }</div>
                        </div>
                    </Link>
            );
        });
     }
    render () {
         console.log(this.props.selProdData)
        return (
            <header className="ui header">  
               <Menu >
               <Menu.Item className="left menu">
                   <Link to={`/`} >
                        <span className="ui item" style={{ backgroundColor: '#f62f5e', color: '#fff', fontWeight: 'bolder' }} >
                        S H O P M A T E
                        </span>
                    </Link>
                </Menu.Item>
                <Navigation /> 
                <Menu.Item className="right menu">
                    <div className={`ui search category ${ this.props.searchResult.rows ? 'active visible': ''}`}>
                        <div className="ui icon input">
                            <input 
                                className="prompt" 
                                type="text" 
                                placeholder="Search..." 
                                onChange={ this.queryString } />
                            <i className="search icon"></i>
                        </div>
                        <div className={`${this.props.searchResult.rows ? 'results transition visible': ''}`}>
                         
                            { this.renderResults() }
                          
                        </div>
                    </div>
                    <div className="bag">
                        <Link to={`/ecom/cartPage`} >
                            <p>{ this.state.cartCount }</p>
                            <p><i className='icon shop'></i></p>
                        </Link>
                    </div>
                    </Menu.Item>
                    
               
                </Menu>
              
            </header>
        );
    }
};
const mapStateToProps = ( state ) => {
    return {
         searchResult: state.ecomdata.searchResult,
         selectedProd: state.ecomdata.selectedProdData,
    }
};

export default connect(mapStateToProps,{ searchQuery })(Header);