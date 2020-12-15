/** @format */
import RainBow from '../hoc/RainBow';
import PropTypes from 'prop-types';
import DatePicker from '../reusable/DatePicker';
const CartPage = () => {
	// const [date, setDate] = useState();
	return (
		<div className='cart-page'>
			<h1>cart</h1>
			<DatePicker
				identifier='date'
				value='any'
				onChange={(e) => console.log(e.detail)}
			/>
		</div>
	);
};
CartPage.propTypes = {
	inputVal: PropTypes.string,
};
export default RainBow(CartPage);
