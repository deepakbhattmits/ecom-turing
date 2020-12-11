/** @format */

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {
	fetchCategoryProd,
	fetchProdDetails,
	fetchProd,
	fetchProdReviews,
} from '../../actions';
const ProductList = (props) => {
	// console.log('  TEST ProductList : ');
	const { rows } = props.ecomSelCatProd;
	const [products, setProducts] = useState([]);
	const [statusColor, setStatusColor] = useState('');
	const [statusSize, setStatusSize] = useState('');
	const [selectedPrice, setSelectedPrice] = useState('');
	const [selectedColor, setSelectedColor] = useState([]);
	const [selectedSize, setSelectedSize] = useState([]);
	const prodDetails = (e) => {
		const { id } = e.target;
		props.fetchCategoryProd(id);
		props.fetchProd(id);
		props.fetchProdDetails(id);
		props.fetchProdReviews(id);
	};
	const renderProd = () => {
		if (!products) {
			return <div>Loading...</div>;
		}
		return products.map(
			({
				product_id,
				name,
				description,
				discounted_price,
				price,
				thumbnail,
			}) => {
				return (
					<Link
						to={`/ecom/prodDetails/${product_id}`}
						id={product_id}
						className='card'
						key={product_id}>
						<div className='image' onClick={prodDetails}>
							<img
								id={product_id}
								src={Object.values(
									require(`../../assets/product_images/${thumbnail}`)
								)}
								alt={thumbnail}
							/>
						</div>
						<div className='content'>
							<div className='header'>{name}</div>
							<div className='description'>{description}</div>
						</div>
						<div className='extra content'>
							<span className=''>{`Regular Price : ${price} `}</span>
							<span className=''>
								{`Discounted Price : ${discounted_price} `}
							</span>
						</div>
					</Link>
				);
			}
		);
	};
	const handleSort = (e) => {
		const { id, textContent } = e.target;
		let filteredproducts = [];

		if (id === 'LH') {
			filteredproducts = products.sort(
				(a, b) => a.discounted_price - b.discounted_price
			);
			setSelectedPrice(textContent);
			setProducts(filteredproducts);
		} else if (id === 'HL') {
			filteredproducts = products.sort(
				(a, b) => b.discounted_price - a.discounted_price
			);
			setSelectedPrice(textContent);
			setProducts(filteredproducts);
		} else {
			filteredproducts = products;
			// console.log('PRICE SORT ORDER : ', id, textContent);
			setSelectedPrice(textContent);
			setProducts(filteredproducts);
		}
	};
	const renderSortByPrice = () => {
		return (
			<div className='ui divided selection list'>
				<div id='LH' className='item' onClick={handleSort}>
					<i className='icon angle double up'></i>
					Low to High
				</div>
				<div id='HL' className='item' onClick={handleSort}>
					<i className='icon angle double down'></i>
					High to Low
				</div>
			</div>
		);
	};
	const renderColor = () => {
		if (!props.colorAttr.length) {
			return <div>Loading....</div>;
		}
		return props.colorAttr.map((attr) => {
			return (
				<button
					key={attr.attribute_value_id}
					onClick={(e) => {
						setSelectedColor(_.uniq([...selectedColor, e.target.id]));
						setStatusColor(_.uniq([...statusColor, e.target.id]));
					}}
					id={attr.value}
					className={`ui ${attr.value.toLowerCase()} circular label ${
						selectedColor.includes(attr.value) ? 'disabled' : ''
					}`}></button>
			);
		});
	};
	const renderSize = () => {
		if (!props.sizeAttr.length) {
			return <div>Loading...</div>;
		}
		return props.sizeAttr.map((attr) => {
			return (
				<button
					id={attr.value}
					onClick={(e) => {
						setSelectedSize(_.uniq([...selectedSize, e.target.id]));
						setStatusSize(_.uniq([...statusSize, e.target.id]));
					}}
					className={`mini ui button ${
						selectedSize.includes(attr.value) ? 'disabled' : ''
					}`}
					key={attr.attribute_value_id}>
					{' '}
					{attr.value}{' '}
				</button>
			);
		});
	};
	const renderSelectedColor = () => {
		const colorArr = selectedColor;
		if (!colorArr) {
			return <div>Loading...</div>;
		}
		return colorArr.map((color, i) => {
			return (
				<div role='listitem' className='item' key={i}>
					{color}
					<i
						id={color}
						className='icon close'
						onClick={(e) => {
							setSelectedColor(selectedColor.filter((x) => e.target.id !== x));
							setStatusColor(statusColor.filter((x) => e.target.id !== x));
						}}
					/>
				</div>
			);
		});
	};

	const renderSelectedSize = () => {
		const sizeArr = selectedSize;
		if (!sizeArr) {
			return <div>Loading...</div>;
		}
		return sizeArr.map((size, i) => {
			return (
				<div role='listitem' className='item' key={i}>
					{size}
					<i
						id={size}
						className='icon close'
						onClick={(e) => {
							setSelectedSize(selectedSize.filter((x) => e.target.id !== x));
							setStatusSize(statusSize.filter((x) => e.target.id !== x));
						}}
					/>
				</div>
			);
		});
	};
	const renderSelectedPrice = () => {
		const priceArr = selectedPrice;
		if (!priceArr) {
			return <div>Loading...</div>;
		}
		return (
			<div role='listitem' className='item'>
				{selectedPrice}
				<i
					className='icon close'
					onClick={(e) => {
						setSelectedPrice('');
						console.log('cancel: ', rows);
						setProducts(rows);
					}}
				/>
			</div>
		);
	};
	useEffect(() => {
		let products = rows;
		setProducts(products);
	}, [rows]);
	return (
		<div className='ui grid left aligned'>
			<div className='four wide column'>
				<h4 className='ui header'>Filters</h4>
				<div className='ui list filters'>
					{selectedColor.length === 0 ? (
						''
					) : (
						<div className='item'>
							<h4 className='ui header'>Selected Color</h4>
							<div role='list' className='ui horizontal list'>
								{renderSelectedColor()}
							</div>
						</div>
					)}
					{selectedSize.length === 0 ? (
						''
					) : (
						<div className='item'>
							<h4 className='ui header'>Selected Size</h4>
							<div role='list' className='ui horizontal list'>
								{renderSelectedSize()}
							</div>
						</div>
					)}
					{selectedPrice.length === 0 ? (
						''
					) : (
						<div className='item'>
							<h4 className='ui header'>Selected Price</h4>
							<div role='list' className='ui horizontal list'>
								{renderSelectedPrice()}
							</div>
						</div>
					)}
					<div className='item'>
						<h4 className='ui header'>Price</h4>
						{renderSortByPrice()}
					</div>
					<div className='item'>
						<h4 className='ui header'>Color</h4>
						{renderColor()}
					</div>
					<div className='item'>
						<h4 className='ui header'>Size</h4>
						{renderSize()}
					</div>
				</div>
			</div>
			<div className='twelve wide column'>
				<div className='ui link cards'>{renderProd()}</div>
			</div>
		</div>
	);
};
const mapDispatchToProps = (dispatch) => ({
	fetchCategoryProd: (data) => dispatch(fetchCategoryProd(data)),
	fetchProdDetails: (data) => dispatch(fetchProdDetails(data)),
	fetchProd: (data) => dispatch(fetchProd(data)),
	fetchProdReviews: (data) => dispatch(fetchProdReviews(data)),
});
const mapStateToProps = (state) => {
	return {
		ecomSelCatProd: state.ecomSelCat.selProd,
		colorAttr: state.ecomdata.colorAttr,
		sizeAttr: state.ecomdata.sizeAttr,
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
