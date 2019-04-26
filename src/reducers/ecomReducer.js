// import _ from 'lodash';
import { 
        LIST_CATEGORIES,
        FETCH_CATEGORIES,
        FETCH_CATEGORY_PROD,
        FETCH_PROD_DETAIL,
        FETCH_PROD,
        FETCH_PROD_REVIEW
 } from '../actions/types';

export default (state=
    { 
        selCat:{},
        selProd:{},
        selProdDetails:{},
        selProdData: {},
        selProdReview:{} 
    }, action) => {
    switch (action.type) {
        case LIST_CATEGORIES : 
        return {...state, ...action.payload }
        case FETCH_CATEGORIES :
        return Object.assign({} ,state, {selCat:action.payload});
        case FETCH_CATEGORY_PROD :
        return Object.assign({} ,state, {selProd:action.payload});
        case FETCH_PROD_DETAIL :
        return Object.assign({},state, {selProdDetails: action.payload})
        case FETCH_PROD :
        return Object.assign({}, state, { selProdData: action.payload })
        case FETCH_PROD_REVIEW :
        return Object.assign({},state,{selProdReview: action.payload })
        default : 
        return state
    }
};