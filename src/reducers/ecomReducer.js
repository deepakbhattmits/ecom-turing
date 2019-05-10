// import _ from 'lodash';
import { 
        FETCH_DEPARTMENTS,
        LIST_CATEGORIES,
        FETCH_CATEGORIES,
        FETCH_CATEGORY_PROD,
        FETCH_PROD_DETAIL,
        FETCH_PROD,
        FETCH_PROD_REVIEW,
        FETCH_COLOR_ATTRIBUTE,
        FETCH_SIZE_ATTRIBUTE,  
        SEARCH_QUERY,
        ADD_TO_CART,
        ADD_TO_SHOP
 } from '../actions/types';

export default (state=

    {   shopingCart:{},
        uniqueCartId:{},
        departments: {},
        departmentCategory: {},
        selCat:{},
        selProd:{},
        sizeAttr: {},
        colorAttr: {},
        selProdDetails:{ color:{},size:{}},
        selProdData: {},
        selProdReview:{},
        searchResult: {}
    }, action) => {
        const colorArr = [];
        const sizeArr = [];
    switch (action.type) {
        case FETCH_DEPARTMENTS : 
        return Object.assign({}, state, { departments: action.payload })
        case SEARCH_QUERY:
        return Object.assign({}, state, { searchResult: action.payload });
        case LIST_CATEGORIES : 
       // return {...state, ...action.payload }
        return Object.assign({},state, { departmentCategory: action.payload });
        case FETCH_CATEGORIES :
        return Object.assign({} ,state, {selCat:action.payload});
        case FETCH_CATEGORY_PROD :
        return Object.assign({} ,state, {selProd:action.payload});
        case FETCH_PROD_DETAIL :
       
        action.payload.forEach(element => {
          
            if(element.attribute_name === 'Color') {
             colorArr.push( element );
            } else if(element.attribute_name === 'Size') {
                sizeArr.push( element );
            }  
        });
        return Object.assign({}, state, {selProdDetails :{ color:  colorArr, size:  sizeArr } })
        case FETCH_PROD :
        return Object.assign({}, state, { selProdData: action.payload })
        case FETCH_PROD_REVIEW :
        return Object.assign({}, state, {selProdReview: action.payload })
        case FETCH_COLOR_ATTRIBUTE : 
        return Object.assign({}, state, { colorAttr: action.payload })
        case FETCH_SIZE_ATTRIBUTE :
        return Object.assign({}, state, {sizeAttr: action.payload })
        case ADD_TO_CART :
        return Object.assign({}, state,{uniqueCartId : action.payload })
        case ADD_TO_SHOP : 
        return Object.assign( {}, state, { shopingCart: action.payload })
        default : 
        return state
    }
};