import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchCategoriesData } from '../../actions';
import ProductPage from './ProductPage';

class CategoryPage extends Component {
    render () {
        // console.log("test 0",this.props);
        const catId = this.props.ecomSelCat.selCat.category_id;
        const catName = this.props.ecomSelCat.selCat.name;
        const catDescription = this.props.ecomSelCat.selCat.description;
        return (
            <div className="ui">
                <h2 className="ui center aligned icon header">
                <i className="circular users icon"></i>
                    { catName }
                </h2>
                <p>{ catDescription } </p>
                <ProductPage catId={ catId } /> 
            </div>
        );
    }
};
const mapStateToProps = ( state, ownProps ) => {
    // console.log("ownprops",ownProps);
    return {
        ecomdata: state.ecomdata[ownProps.match.params.id],
        ecomSelCat: state.ecomSelCat,
    }
}
// fetchCategoriesData 
export default connect(mapStateToProps,null)(CategoryPage);
