/** @format */

// import _ from 'lodash';
import { ecomShop } from '../constants/types';
const ecomReducer= (
	state = {
		shopingCart: {},
		uniqueCartId: {},
		departments: {},
		departmentCategory: {},
		selCat: {},
		selProd: {},
		sizeAttr: {},
		colorAttr: {},
		selProdDetails: { color: {}, size: {} },
		selProdData: {},
		selProdReview: {},
		searchResult: {}
	},
	action
) => {
	const colorArr = [];
	const sizeArr = [];
	switch (action.type) {
		case ecomShop.FETCH_DEPARTMENTS:
			// console.log(action.type);
			return Object.assign({}, state, { departments: action.payload });
		case ecomShop.SEARCH_QUERY:
			return Object.assign({}, state, { searchResult: action.payload });
		case ecomShop.LIST_CATEGORIES:
			// return {...state, ...action.payload }
			return Object.assign({}, state, { departmentCategory: action.payload });
		case ecomShop.FETCH_CATEGORIES:
			return Object.assign({}, state, { selCat: action.payload });
		case ecomShop.FETCH_CATEGORY_PROD:
			return Object.assign({}, state, { selProd: action.payload });
		case ecomShop.FETCH_PROD_DETAIL:
			action.payload.forEach(element => {
				if (element.attribute_name === 'Color') {
					colorArr.push(element);
				} else if (element.attribute_name === 'Size') {
					sizeArr.push(element);
				}
			});
			return Object.assign({}, state, {
				selProdDetails: { color: colorArr, size: sizeArr }
			});
		case ecomShop.FETCH_PROD:
			return Object.assign({}, state, { selProdData: action.payload });
		case ecomShop.FETCH_PROD_REVIEW:
			return Object.assign({}, state, { selProdReview: action.payload });
		case ecomShop.FETCH_COLOR_ATTRIBUTE:
			return Object.assign({}, state, { colorAttr: action.payload });
		case ecomShop.FETCH_SIZE_ATTRIBUTE:
			return Object.assign({}, state, { sizeAttr: action.payload });
		case ecomShop.ADD_TO_CART:
			return Object.assign({}, state, { uniqueCartId: action.payload });
		case ecomShop.ADD_TO_SHOP:
			return Object.assign({}, state, { shopingCart: action.payload });
		default:
			return state;
	}
};
export default ecomReducer;
