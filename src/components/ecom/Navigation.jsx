import React, { Component, Fragment  } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories, fetchCategoriesData, fetchCategoryProd } from '../../actions';

class Navigation extends Component {
   

    componentDidMount (){
        this.props.fetchCategories();
    }
    cat = (e) => {
        // console.log(e.target.id);
        this.props.fetchCategoriesData(e.target.id);
        this.props.fetchCategoryProd(e.target.id);
        
    }
    renderCategories () {  
        if(!this.props.cateogries.rows){
            return <div></div>;
        }     
        return this.props.cateogries.rows.map(({ category_id, name  }) => {
            return (
                
                <div className="item" key={ category_id } onClick={ this.cat }>
              

                <div className="content">
                    <Link to={`/ecom/categories/${ category_id }`} id={ category_id } > 
                        {name}
                    </Link>
                </div>

                </div>
            );
        });
    }
    render () {
        // style={{ backgroundColor: '#f62f5e' }} 
        //  console.log("selected category : ",this.props.cateogries);
        return (
           <Fragment>
                { this.renderCategories() }
                
            </Fragment> 
        );
    }
};
const mapStateToProps = ( state ) => {
    return {
        cateogries: state.ecomdata,
    }
}
export default connect(mapStateToProps, { fetchCategories, fetchCategoriesData, fetchCategoryProd })(Navigation);