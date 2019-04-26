import { combineReducers } from 'redux';
import ecomReducer from './ecomReducer';

export default combineReducers({
    ecomdata: ecomReducer,
    ecomSelCat: ecomReducer,
})