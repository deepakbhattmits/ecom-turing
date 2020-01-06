/** @format */

import React, { Component } from 'react';
import _ from 'lodash';

class ReviewPage extends Component {
	render() {
		// console.log('TEST :',this.props)
		return (
			<div className='ui relaxed divided list'>
				<div className='item'>
					<div className='ui large star rating'>
						{_.times(this.props.ratings, i => (
							<i className='icon yellow' key={i} />
						))}
					</div>
					<div className='content '>
						<span className='header'> {this.props.name}</span>
						<div className='description'>Updated 10 mins ago</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ReviewPage;
