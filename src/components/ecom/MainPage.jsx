/** @format */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDepartments } from '../../actions';

const MainPage = props => {
	const departments = useSelector(state => state.ecomdata.departments);
	const dispatch = useDispatch();
	useEffect(() => {
		console.log('mainpage', departments);
		if (!departments) {
			dispatch(fetchDepartments());
		}
	}, []);
	console.log('MainPage : ', departments);
	// constructor(props) {
	// 	super(props);
	// 	// console.logx('constructor');
	// 	// this.state = { homecomponent: true };
	// }

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
	//   console.log('componentWillUnmount : ');
	// // }
	return (
		<div>
			<div className='ui inverted vertical masthead center aligned segment'>
				<img
					className='ui fluid image'
					src={require('../../assets/images/banner-01.jpg')}
					alt='hello'
				/>
				{/* <button
						className='ui huge primary button'
						onClick={e => {
							this.setState({ homecomponent: !this.state.homecomponent });
						}}>
						GO..<i className='right arrow icon'></i>
					</button> */}
			</div>

			<div className='ui vertical stripe segment'>
				<div className='ui middle aligned stackable grid container'>
					<div className='row'>
						<div className='eight wide column'>
							<h1 className='ui header'>Shop By Category</h1>
							<a className='ui huge button'>Check Them Out</a>
						</div>
						<div className='six wide right floated column'>
							<img
								src='https://via.placeholder.com/400x300.png?text=Cat.1'
								className='ui large bordered rounded image'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='ui vertical stripe quote segment'>
				<div className='ui equal width stackable internally celled grid'>
					<div className='center aligned row'>
						<div className='column'>
							<h3>
								New Arivals - {departments.length ? departments[0].name : ''}
							</h3>
						</div>
						<div className='column'>
							<h3>Clothes</h3>
							<p>
								<img
									src='https://via.placeholder.com/400x300.png?text=Cat.1'
									className='ui large bordered rounded image'
								/>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className='ui vertical stripe segment'>
				<div className='ui text container'>
					<h3 className='ui header'>Breaking The Grid, Grabs Your Attention</h3>
					<p>
						Instead of focusing on content creation and hard work, we have
						learned how to master the art of doing nothing by providing massive
						amounts of whitespace and generic content that can seem massive,
						monolithic and worth your attention.
					</p>
					<a className='ui large button'>Read More</a>
					<h4 className='ui horizontal header divider'>
						<a href='#'>Case Studies</a>
					</h4>
					<h3 className='ui header'>Did We Tell You About Our Bananas?</h3>
					<p>
						Yes I know you probably disregarded the earlier boasts as
						non-sequitur filler content, but its really true. It took years of
						gene splicing and combinatory DNA research, but our bananas can
						really dance.
					</p>
					<a className='ui large button'>I'm Still Quite Interested</a>
				</div>
			</div>
		</div>
	);
};
export default MainPage;
