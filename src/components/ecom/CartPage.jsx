import React, { useState } from 'react';
import RainBow from '../hoc/RainBow';
import PropTypes from 'prop-types';

const CartPage =()=> {
  const [inputVal, setInputVal] = useState('');
  // console.log('test :')
    return (
      <div className='cart-page'>
        cart count
        <input
          type='text'
          onChange={e =>
            setInputVal(e.target.value)
                     }
          value={inputVal}
        />
        {`Input Text is :${inputVal}`}
      </div>
    );
  }
CartPage.propTypes = {
  inputVal: PropTypes.string
};
export default RainBow(CartPage);
