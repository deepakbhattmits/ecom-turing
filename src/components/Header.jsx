/** @format */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from './ecom/Navigation';
import { searchQuery } from '../actions';
// import ListExample from './ListExample';
const Header = props => {
	console.log('TEST :> ', props);
	const myRef = useRef(null);
	const cartCount = useState()[0];
	const [value, setValue] = useState('');
	const queryString = e => {
		setValue(e.target.value);
		props.searchQuery(value);
	};
	const select = () => {
		setValue('');
	};
	const moveFocus = () => {
		const node = myRef.current;
		node.addEventListener('keydown', function(e) {
			const active = document.activeElement;
			if (e.keyCode === 40 && active.nextSibling) {
				active.nextSibling.focus();
			}
			if (e.keyCode === 38 && active.previousSibling) {
				active.previousSibling.focus();
			}
		});
	};
	const renderResults = () => {
		if (!props.searchResult.rows) {
			return <div>Loading...</div>;
		}
		return props.searchResult.rows.map((result, i) => {
			return (
				<Link
					to={`/ecom/prodDetails/${result.product_id}`}
					className='result'
					tabIndex={i}
					key={i}
					id={result.product_id}
					onClick={select}>
					<div className='image'>
						<img
							src={require(`../assets/product_images/${result.thumbnail}`)}
							alt={result.thumbnail}
						/>
					</div>
					<div className='content'>
						<div className='price'>{result.discounted_price}</div>
						<div className='title'>{result.name}</div>
						<div className='description'>{`${result.description.substring(
							0,
							35
						)}...`}</div>
					</div>
				</Link>
			);
		});
	};
	const clearInput = useCallback(() => {
		console.log('clearInput : ', value);
		props.searchQuery(value);
		setValue('');
	}, [props, value]);
	//   componentDidMount() {
	//     window.addEventListener('keydown', this.callback, false);
	//     document.addEventListener('mousedown', this.handleClickOutside);
	//     this.moveFocus();
	//   }

	//   componentWillUnmount() {
	//     window.removeEventListener('keydown', window.callback, false);
	//     document.removeEventListener('mousedown', this.handleClickOutside);
	//     }

	/**
	 * Alert if clicked on outside of element
	 */
	//   const handleClick = e => {
	//     const node = myRef.current;
	//     if (node.contains(e.target)) {
	//       //click the inside , continue whatever you want
	//       console.log('inside TEST : ', e.target);
	//       return;
	//     }
	//     handleClickOutside();
	//   };
	const handleClickOutside = event => {
		// console.log('outside TEST : ', myRef);
	};
	// console.log(props.selProdData);
	// const callback = useCallback(e => {
	//   console.log('value : ',value)
	//   if (e.keyCode === 27) {
	//     clearInput();
	//   }
	//   if (e.keyCode === 30) {
	//     props.searchQuery(value);
	//   }
	// },[clearInput, props, value]);
	useEffect(() => {
		const callback = e => {
			// console.log(e.keyCode)
			if (e.keyCode === 27) {
				clearInput();
			}
			if (e.keyCode === 13) {
				props.searchQuery(value);
			}
		};
		document.addEventListener('keydown', callback, true);
		document.addEventListener('mousedown', handleClickOutside, false);
		moveFocus();
		return () => {
			document.removeEventListener('keydown', callback, true);
			document.removeEventListener('mousedown', handleClickOutside, false);
		};
	}, [clearInput, props, value]);
	return (
		<header>
			{/* <ListExample /> */}
			<div className='ui pointing menu'>
				<div className='left menu'>
					<Link to={`/`}>
						<span
							className='ui item'
							style={{
								backgroundColor: '#f62f5e',
								color: '#fff',
								fontWeight: 'bolder',
								textTransform: 'uppercase',
								letterSpacing: '.4rem'
							}}>
							shopmate
						</span>
					</Link>
				</div>

				<Navigation />

				<div className='right menu'>
					<div
						className={`ui search category ${
							props.searchResult.rows ? 'active visible' : ''
						}`}>
						<div className='ui icon input'>
							<input
								className='prompt'
								type='text'
								placeholder='Search...'
								onChange={queryString}
								value={value}
							/>
						</div>
						{value.length === 0 ? (
							<i className='search icon'></i>
						) : (
							<i className='icon window close outline' onClick={clearInput}></i>
						)}

						<div
							className={`results transition ${
								value &&
								props.searchResult.rows &&
								props.searchResult.rows.length > 0
									? 'visible'
									: 'hidden'
							}`}
							ref={myRef}>
							{renderResults()}
						</div>
					</div>
					<div className='bag'>
						<Link to={`/ecom/cartPage`}>
							<p>{cartCount}</p>
							<p>
								<i className='icon shop'></i>
							</p>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};
const mapDispatchToProps = dispatch => ({
	searchQuery: data => dispatch(searchQuery(data))
});
const mapStateToProps = state => {
	return {
		searchResult: state.ecomdata.searchResult,
		selectedProd: state.ecomdata.selectedProdData
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
