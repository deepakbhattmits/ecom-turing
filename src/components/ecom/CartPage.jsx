/** @format */
import RainBow from '../hoc/RainBow';
import PropTypes from 'prop-types';

const CartPage = () => (
	<div className='cart-page'>
		<h1>cart </h1>
	</div>
);
CartPage.propTypes = {
	inputVal: PropTypes.string,
};
export default RainBow(CartPage);
