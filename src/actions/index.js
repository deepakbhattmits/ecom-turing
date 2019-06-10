import { 
        FETCH_DEPARTMENTS,
        LIST_CATEGORIES, 
        FETCH_CATEGORIES, 
        FETCH_CATEGORY_PROD, 
        FETCH_PROD_DETAIL, 
        FETCH_PROD, 
        FETCH_PROD_REVIEW,
        FETCH_SIZE_ATTRIBUTE,
        FETCH_COLOR_ATTRIBUTE,
        SEARCH_QUERY,
        ADD_TO_CART,
        ADD_TO_SHOP } from './types';
import backendapi from '../apis/backendapi';
export const fetchDepartments = () => async ( dispatch ) => {
    const response = await backendapi.get(`departments`);
    // console.log('hello DE');
    dispatch({ type: FETCH_DEPARTMENTS, payload: response.data })
}
export const fetchCategories = ( id ) => async ( dispatch ) => {
    const response =  await backendapi.get(`categories/inDepartment/${ id }`);
    dispatch({ type: LIST_CATEGORIES, payload: response.data })
}
export const fetchCategoriesData = ( id ) => async ( dispatch ) => {
    const response = await backendapi.get(`categories/${ id }`);
  
    dispatch({ type: FETCH_CATEGORIES, payload: response.data })
}
export const fetchCategoryProd = ( id ) => async ( dispatch ) => {
    const response = await backendapi.get(`products/inCategory/${ id }`);
    //   console.log(response);
    dispatch({ type : FETCH_CATEGORY_PROD, payload: response.data }) 
}
export const fetchProd = ( id ) => async ( dispatch ) => {
    const response = await backendapi.get(`products/${ id }`);
    dispatch({ type: FETCH_PROD, payload: response.data }) 
}
export const fetchProdDetails = ( id ) => async ( dispatch ) => {
    const response = await backendapi.get(`attributes/inProduct/${ id }`);
    // console.log('FROM ACTION',response);
    dispatch({ type: FETCH_PROD_DETAIL, payload: response.data })
}
export const fetchProdReviews = ( id ) => async ( dispatch ) => {
    const response = await backendapi.get(`products/${ id }/reviews`);
    dispatch({type: FETCH_PROD_REVIEW, payload: response.data })
}
export const fetchAttributeSize = (id = 1 ) => async ( dispatch ) => {
    const response = await backendapi.get(`attributes/values/${id}`);
    dispatch({type: FETCH_SIZE_ATTRIBUTE, payload: response.data })
}
export const fetchAttributeColor = (id = 2 ) => async ( dispatch ) => {
    const response = await backendapi.get(`attributes/values/${id}`);
    dispatch({type: FETCH_COLOR_ATTRIBUTE, payload: response.data })
}
export const searchQuery = ( query ) => async (dispatch) => {
    const response = await backendapi.get(`products/search?query_string=${ query }`);
    dispatch({ type: SEARCH_QUERY , payload: response.data });
}
export const addToCart = ( ) => async (dispatch) => {
    const response = await backendapi.get(`shoppingcart/generateUniqueId`);
   // console.log(response);
    dispatch({ type: ADD_TO_CART , payload: response.data})
}
export const addShoppingCart = ( cartData ) => async ( dispatch ) => {
    const response = await backendapi.post(`shoppingcart/add${ [{...cartData }] }`);
    dispatch({ type: ADD_TO_SHOP, payload: response.data });
}