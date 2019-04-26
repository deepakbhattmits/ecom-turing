import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import imgStatic from '../../assets/product_images/afghan-flower-thumbnail.gif';
// import RatingsPage from './RatingsPage';

// import img from '../../assets/product_images';
class ProdDetails extends Component {
    componentWillReceiveProps(){
        console.log('component will receive props : ',this.props);
    }
    renderProReview = () => {
        
        return this.props && this.props.prodReview.length > 0 ?

                this.props.prodReview.map((review, i) => {
                    return (
                        <div key={ i } id={ i }>
                       
                           {/* { review.name } - { review.rating } - { this.state.rating } */}
                           {/* <RatingsPage ratings={ review.rating } name={ review.name } /> */}
                        </div>
                    );

                }) : 
                <span></span>;
    }
    renderProdData = () => {
        
        return this.props && this.props.prodData ?
        
                <div id={this.props.prodData.product_id}>
                    <p> {this.props.prodData.name} </p>
                    <p>{this.props.prodData.description}</p>
                    <p>{this.props.prodData.price}</p>
                    <p>{this.props.prodData.discounted_price}</p>
                    <p>{ this.props.prodData.image }</p>
                    <p>{ this.props.prodData.image_2 }</p>
                    <p>{ this.props.prodData.thumbnail } </p>
                    <p>

                        {/* {  console.log(`test: ${ img }/${ this.props.prodData.image }`)}  } */}                         
                    {/* <img 
                          src={require(`../../assets/product_images/${this.props.prodData.image}`) }
                           alt={this.props.prodData.thumbnail} 
                     />  */}
                    </p>
                 </div>
        : <span></span>;
    }
    renderProductDetail () {
       return this.props && this.props.prodsAttr.length > 0 ?
        this.props.prodsAttr.map(attr => {
            return (
                <div key={ attr.attribute_value_id } style={{ padding:'10px'}}>
                    <div className={ attr.attribute_name } ><span style={{ padding:'10px', backgroundColor:attr.attribute_value, color: attr.attribute_value, border: '1px solid #000' }}>{attr.attribute_value}</span></div>
                </div>
            );
        }) 
        :
         <span></span>;
    }
    render () {
        // const pathToProdImage = require(`../../assets/product_images/${this.props.prodData.image}`);
        // const pathToProdImage = `${img}/${this.props.prodData.image}`;
        // const thumbinail = this.props.prodData.thumbinail;
       
    //    console.log('test 0 : ',this.props.prodData.image );
    //    console.log('test : ',pathToProdImage);
        return (
            <div className="ui grid"> 
                <div className="seven wide column">
                    { this.renderProdData() }
                    {/* {  console.log(`test: ${ pathToProdImage }`)}  */}
                    {/* <img 
                        src={ pathToProdImage }
                        alt={ thumbinail } 
                    /> */}
                    <img src={ imgStatic } alt='test' />
                </div>
                <div className="nine wide column">
                   
                        <div style={{  
                                        display:'grid',
                                        gridGap:'25px',
                                        gridTemplateColumns: '40px 40px 100px',
                                        gridTemplateRows: 'auto',
                                     }}
                                      >
                            { this.renderProductDetail() }
                        </div>
                        {/* <Link to='/ecom/ReviewPage'>{this.renderProReview()}</Link> */}
                        <Link to='/ecom/ReviewPage'>
                            { _.meanBy( this.props.prodReview, (p) => p.rating) }
                        </Link>
                          {/* { _.meanBy( this.props.prodReview, (p) => p.rating) } */}
                        {this.renderProReview()}
                </div>
               
            </div>
        );
    }
};
const mapStateToProps = ( state ) => {
    return {
        prodsAttr : state.ecomdata.selProdDetails,
        prodData : state.ecomdata.selProdData,
        prodReview: state.ecomdata.selProdReview,
    }
}
export default connect(mapStateToProps, null )(ProdDetails);