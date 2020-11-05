/** @format */
import { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {
	fetchCategoryProd,
	fetchProdDetails,
	fetchProd,
	fetchProdReviews,
} from '../../actions';
class ProductPage extends Component {
	state = {
		statusColor: '',
		statusSize: '',
		selectedColor: [],
		selectedSize: [],
	};
	prodDetails = (e) => {
		this.props.fetchCategoryProd(e.target.id);
		this.props.fetchProd(e.target.id);
		this.props.fetchProdDetails(e.target.id);
		this.props.fetchProdReviews(e.target.id);
	};
	renderProd = () => {
		if (!this.props.ecomSelCatProd.rows) {
			return <div>Loading....</div>;
		}
		return this.props.ecomSelCatProd.rows.map(
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
						<div className='image' onClick={this.prodDetails}>
							<img
								id={product_id}
								src={require(`../../assets/product_images/${thumbnail}`)}
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
	renderColor = () => {
		if (!this.props.colorAttr.length) {
			return <div>Loading...</div>;
		}
		return this.props.colorAttr.map((attr) => {
			return (
				<button
					key={attr.attribute_value_id}
					onClick={(e) => {
						this.setState({
							selectedColor: _.uniq([...this.state.selectedColor, e.target.id]),
							statusColor: _.uniq([...this.state.statusColor, e.target.id]),
						});
					}}
					id={attr.value}
					className={`ui ${attr.value.toLowerCase()} circular label ${
						this.state.selectedColor.includes(attr.value) ? 'disabled' : ''
					}`}></button>
			);
		});
	};
	renderSize = () => {
		if (!this.props.sizeAttr.length) {
			return <div>Loading...</div>;
		}
		return this.props.sizeAttr.map((attr) => {
			return (
				<button
					id={attr.value}
					onClick={(e) => {
						this.setState({
							selectedSize: _.uniq([...this.state.selectedSize, e.target.id]),
							statusSize: _.uniq([...this.state.statusSize, e.target.id]),
						});
					}}
					className={`mini ui button ${
						this.state.selectedSize.includes(attr.value) ? 'disabled' : ''
					}`}
					key={attr.attribute_value_id}>
					{' '}
					{attr.value}{' '}
				</button>
			);
		});
	};
	renderSelectedColor = () => {
		const colorArr = this.state.selectedColor;
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
							this.setState({
								selectedColor: this.state.selectedColor.filter(
									(x) => e.target.id !== x
								),
								statusColor: this.state.statusColor.filter(
									(x) => e.target.id !== x
								),
							});
						}}
					/>
				</div>
			);
		});
	};

	renderSelectedSize = () => {
		const sizeArr = this.state.selectedSize;
		if (!sizeArr) {
			return <div>Loading....</div>;
		}
		return sizeArr.map((size, i) => {
			return (
				<div role='listitem' className='item' key={i}>
					{size}
					<i
						id={size}
						className='icon close'
						onClick={(e) => {
							this.setState({
								selectedSize: this.state.selectedSize.filter(
									(x) => e.target.id !== x
								),
								statusSize: this.state.statusSize.filter(
									(x) => e.target.id !== x
								),
							});
						}}
					/>
				</div>
			);
		});
	};

	render() {
		return (
			<div className='ui grid left aligned'>
				<div className='four wide column'>
					<h4 className='ui header'>Filters</h4>
					<div className='ui list'>
						<div className='item'>
							{this.state.selectedColor.length === 0 ? (
								''
							) : (
								<h4 className='ui header'>Color</h4>
							)}
							<div role='list' className='ui horizontal list'>
								{this.renderSelectedColor()}
							</div>
						</div>
						<div className='item'>
							{this.state.selectedSize.length === 0 ? (
								''
							) : (
								<h4 className='ui header'>Size</h4>
							)}
							<div role='list' className='ui horizontal list'>
								{this.renderSelectedSize()}
							</div>
						</div>
						<div className='item'>
							<h4 className='ui header'>Color</h4>
							{this.renderColor()}
						</div>
						<div className='item'>
							<h4 className='ui header'>Size</h4>
							{this.renderSize()}
						</div>
						<div className='item'>
							<h4 className='ui header'>Price</h4>
							<input id='startPrice' type='range' min='1' />
							<input id='endPrice' type='range' min='2' max='1001' />
						</div>
					</div>
				</div>
				<div className='twelve wide column'>
					<div className='ui link cards'>{this.renderProd()}</div>
				</div>
			</div>
		);
	}
}
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
