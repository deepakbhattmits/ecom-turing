import React, { Component } from 'react';
import RainBow from '../hoc/RainBow';

class CartPage extends Component {
    state=  { 
                inputVal: '',
              
            }
    
    render () {
       //  const divstyle = { backgroundColor: 'cyan', color: '#000' }
        return (
            <div className="cart-page">
                cart count
                <input 
                    type='text' 
                    onChange={(e) => this.setState({inputVal: e.target.value.toUpperCase()})}
                    value={ this.state.inputVal }
                />
                {`Input Text is :${ this.state.inputVal }`}
            </div>
        );
    }
};
export default RainBow( CartPage );
