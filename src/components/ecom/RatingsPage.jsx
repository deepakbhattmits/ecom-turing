import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class RatingsPage extends Component {
    state={ rating: 5}
    renderStar = () => {
        this.props.reviews.map((star,i) => {
            return (
                <Fragment key={ i }>
                    <i className="icon"></i> { star.name }
                </Fragment>
            );
        });
    }
    render(){
        console.log(this.props)
      
    return (
        <div>
          <div >

        
                     <div className="ui large star rating">
                     { this.renderStar }
                     {_.times(this.props.ratings, i =>
                            <i className="icon" key={i} />
                    )}
                  
                    </div>
                </div>
           
        </div>
    );
    }
};
const mapStateToProps = ( state ) => {
    return {
        reviews: state.selProdReview,
    }
}
export default connect(mapStateToProps,null)(RatingsPage);