import { LIST_CATEGORIES, FETCH_CATEGORIES, FETCH_CATEGORY_PROD, FETCH_PROD_DETAIL, FETCH_PROD, FETCH_PROD_REVIEW } from './types';
import backendapi from '../apis/backendapi';
export const fetchCategories = () => async ( dispatch ) => {
    const response =  await backendapi.get(`categories`);
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