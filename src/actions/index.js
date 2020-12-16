/** @format */

import { ecomShop } from '../constants/types';
import backendapi from '../apis/backendapi';
export const fetchDepartments = () => async (dispatch) => {
	const response = await backendapi.get(`departments`);
	// console.log('hello :');
	dispatch({ type: ecomShop.FETCH_DEPARTMENTS, payload: response.data });
};
export const fetchCategories = (id) => async (dispatch) => {
	const response = await backendapi.get(`categories/inDepartment/${id}`);
	dispatch({ type: ecomShop.LIST_CATEGORIES, payload: response.data });
};
export const fetchCategoriesData = (id) => async (dispatch) => {
	const response = await backendapi.get(`categories/${id}`);

	dispatch({ type: ecomShop.FETCH_CATEGORIES, payload: response.data });
};
export const fetchCategoryProd = (id) => async (dispatch) => {
	const response = await backendapi.get(`products/inCategory/${id}`);
	//   console.log(response);
	dispatch({ type: ecomShop.FETCH_CATEGORY_PROD, payload: response.data });
};
export const fetchProd = (id) => async (dispatch) => {
	const response = await backendapi.get(`products/${id}`);
	dispatch({ type: ecomShop.FETCH_PROD, payload: response.data });
};
export const fetchProdDetails = (id) => async (dispatch) => {
	const response = await backendapi.get(`attributes/inProduct/${id}`);
	// console.log('FROM ACTION',response);
	dispatch({ type: ecomShop.FETCH_PROD_DETAIL, payload: response.data });
};
export const fetchProdReviews = (id) => async (dispatch) => {
	const response = await backendapi.get(`products/${id}/reviews`);
	dispatch({ type: ecomShop.FETCH_PROD_REVIEW, payload: response.data });
};
export const fetchAttributeSize = (id = 1) => async (dispatch) => {
	const response = await backendapi.get(`attributes/values/${id}`);
	dispatch({ type: ecomShop.FETCH_SIZE_ATTRIBUTE, payload: response.data });
};
export const fetchAttributeColor = (id = 2) => async (dispatch) => {
	const response = await backendapi.get(`attributes/values/${id}`);
	dispatch({ type: ecomShop.FETCH_COLOR_ATTRIBUTE, payload: response.data });
};
export const searchQuery = (query) => async (dispatch) => {
	const response = await backendapi.get(
		`products/search?query_string=${query}`
	);
	dispatch({ type: ecomShop.SEARCH_QUERY, payload: response.data });
};
export const addToCart = () => async (dispatch) => {
	const response = await backendapi.get(`shoppingcart/generateUniqueId`);
	// console.log(response);
	dispatch({ type: ecomShop.ADD_TO_CART, payload: response.data });
};
export const addShoppingCart = (cartData) => async (dispatch) => {
	const response = await backendapi.post(
		`shoppingcart/add${[{ ...cartData }]}`
	);
	dispatch({ type: ecomShop.ADD_TO_SHOP, payload: response.data });
};
