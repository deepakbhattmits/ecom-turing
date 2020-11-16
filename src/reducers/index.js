/** @format */

import { combineReducers } from 'redux';
import ecomReducer from './ecomReducer';
// ecomReducer
export default combineReducers({
	ecomdata: ecomReducer,
	ecomSelCat: ecomReducer,
});
