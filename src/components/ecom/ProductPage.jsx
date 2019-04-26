import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProdDetails, fetchProd, fetchProdReviews } from '../../actions';
class ProductPage extends Component {
    prodDetails = (e) => {
        // console.log(e.target.id);
        this.props.fetchProd( e.target.id );
        this.props.fetchProdDetails( e.target.id );
        this.props.fetchProdReviews( e.target.id );
    }
    renderProd = ( ) => {
         
        if(!this.props.ecomSelCatProd.rows){
            return <div>Loading...</div>
        }
        return this.props.ecomSelCatProd.rows.map(({ product_id, name, description, discounted_price, price, thumbnail }) => {
            return (
                  <Link to={`/ecom/prodDetails/${ product_id }`} id={ product_id } className="card" key={ product_id }>
                   <div className="image" onClick={ this.prodDetails }>
                   {/* {console.log(require(`../../assets/product_images/${thumbnail}`))} */}
                       <img 
                            id={ product_id }
                            src={require(`../../assets/product_images/${thumbnail}`) }
                            alt={ thumbnail }
                       />
                    </div>
                    <div className="content">
                        <div className="header">{ name }</div>
                        <div className="description">
                            { description }
                        </div>
                    </div>
                    <div className="extra content">
                        <span className=''>
                        { `Regular Price : ${ price } ` }
                        </span>
                        <span className=''>
                        {  `Discounted Price : ${  discounted_price } `}
                        </span>
                        
                    </div>
                    </Link>
               
             
            );
        });
       
    }
    render() {
        // console.log('product page :', );

        return (
            <div className='ui link cards'>
               { this.renderProd() }
            </div>
        );
    }
};
const mapStateToProps = ( state ) => {
    return {
        ecomSelCatProd: state.ecomSelCat.selProd,
    }
}
export default connect(mapStateToProps, { fetchProdDetails, fetchProd, fetchProdReviews } )(ProductPage);