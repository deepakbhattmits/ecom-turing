/** @format */

import React, { Component } from 'react';
import RainBow from '../hoc/RainBow';

class MainPage extends Component {
	constructor(props) {
		super(props);
		console.log('constructor');
		this.state = { homecomponent: true };
	}

	// getDerivedStateFromProps(nextProps) {
	//   console.log('componentWiilReceiveProps', nextProps);
	// }
	// shouldComponentUpdate(nextProps, nextState) {
	//   console.log('shouldComponentUpdate', nextProps, nextState);
	//   return true;
	// }
	// componentWillUpdate(nextProps, nextState) {
	//   console.log('componentWillUpdate', nextProps, nextState);
	// }
	// componentDidUpdate(nextProps, nextState) {
	//   console.log('componentDidUpdate', nextProps, nextState);
	// }
	// componentWillUnmount() {
	  console.log('componentWillUnmount : ');
	// }
	render() {
		return (
			<div>
				<div className='ui inverted vertical masthead center aligned segment'>
					<div className='ui text container'>
						<h1 className='ui inverted header'>Happy Birthday. </h1>
						<button
							className='ui huge primary button'
							onClick={e => {
								this.setState({ homecomponent: !this.state.homecomponent });
							}}>
							GO....<i className='right arrow icon'></i>
						</button>
					</div>
				</div>
			</div>
		);
	}
}
export default RainBow(MainPage);
