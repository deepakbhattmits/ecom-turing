/** @format */

import { Component, Fragment } from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import _ from 'lodash';
import ReviewPage from './ReviewPage';
import PropTypes from 'prop-types';
import {
	fetchProdDetails,
	fetchProd,
	fetchProdReviews,
	addToCart,
	addShoppingCart,
} from '../../actions';
//  TODO :  functional
class ProdDetails extends Component {
	state = {
		status: false,
		validate: false,
		name: '',
		size: null,
		color: null,
		attributes: [],
		maxLimit: 5,
		quantity: 1,
		aliceResponsive: {
			0: { items: 1 },
			1024: { items: 3 },
		},
		cartData: [{}],
	};
	componentDidMount() {
		const prod_id =
			this.props && this.props.match.params.id
				? this.props.match.params.id
				: '';
		this.props.fetchProd(prod_id);
		this.props.fetchProdDetails(prod_id);
		this.props.fetchProdReviews(prod_id);
		this.props.addToCart();
	}
	// componentWillReceiveProps() {
	// console.log('component will receive props : ', this.props);
	// }
	renderProReview = () => {
		return this.props && this.props.prodReview.length > 0 ? (
			this.props.prodReview.map((review, i) => {
				return (
					<div key={i} id={i}>
						<ReviewPage ratings={review.rating} name={review.name} />
					</div>
				);
			})
		) : (
			<span></span>
		);
	};
	renderProductColor() {
		if (!this.props.prodsAttr.color.length) {
			return <div>Loading...</div>;
		}
		return this.props.prodsAttr.color.map((attr) => {
			return (
				<button
					key={attr.attribute_value_id}
					onClick={(e) => {
						this.setState({ color: e.target.id });
					}}
					id={attr.attribute_value}
					className={`ui ${attr.attribute_value.toLowerCase()} circular label ${
						attr.attribute_name
					}`}></button>
			);
		});
	}

	renderProductSize() {
		if (!this.props.prodsAttr.size.length) {
			return <div>Loading...</div>;
		}
		return this.props.prodsAttr.size.map((attr) => {
			return (
				<button
					id={attr.attribute_value}
					onClick={(e) => {
						this.setState({ size: e.target.id });
					}}
					className={`ui button ${attr.attribute_name}`}
					key={attr.attribute_value_id}>
					{' '}
					{attr.attribute_value}{' '}
				</button>
			);
		});
	}
	add = () => {
		this.setState(
			{
				cartData: [
					{
						...this.state.cartData,
						// eslint-disable-next-line no-useless-computed-key
						['item_id']: this.props.uniqueCartId.cart_id
							? this.props.uniqueCartId.cart_id
							: '',
						// eslint-disable-next-line no-useless-computed-key
						['name']:
							this.props && this.props.prodData ? this.props.prodData.name : '',
						// eslint-disable-next-line no-useless-computed-key
						['product_id']: this.props.prodData
							? this.props.prodData.product_id
							: '',
						// eslint-disable-next-line no-useless-computed-key
						['attributes']: `${this.state.color ? this.state.color : ' '},${
							this.state.size ? this.state.size : ' '
						}`,
						// eslint-disable-next-line no-useless-computed-key
						['price']: this.props.prodData
							? this.props.prodData.discounted_price
							: '',
						// eslint-disable-next-line no-useless-computed-key
						['quantity']: this.state.quantity,
						// eslint-disable-next-line no-useless-computed-key
						['image']: this.props.prodData ? this.props.prodData.image : '',
						// eslint-disable-next-line no-useless-computed-key
						['subtotal']: this.props.prodData
							? parseFloat(
									(
										this.state.quantity * this.props.prodData.discounted_price
									).toFixed(2)
							  )
							: '',
					},
				],
			},
			() => {
				this.validate();
			}
		);

		// this.setState({ cartData: [ ...this.state.cartData,this.state.quantity ] });
	};
	validate() {
		// console.log('want to add in cart :', this.state.cartData);
		this.props.addShoppingCart(this.state.cartData);
		// rtData).length > 1) {

		for (var key in this.state.cartData) {
			if (key === 'attributes') {
				console.log(this.state.cartData[key].includes(' ,'));
				if (
					this.state.cartData[key].includes(' , ') ||
					this.state.cartData[key].includes(' ,') ||
					this.state.cartData[key].includes(', ')
				) {
					this.setState({ validate: true }, () => {
						this.throwErrormsg();
					});
				}
			}
			if (this.state.cartData[key]) {
				this.setState({ validate: false });
			} else {
				this.setState({ validate: true });
			}
		}
	}
	throwErrormsg = () => {
		this.setState({ validate: true });
	};
	closeLogin() {
		this.setState({ open: false });
	}
	onSlideChange(e) {
		console.debug('Item`s position during a change: ', e.item);
		console.debug('Slide`s position during a change: ', e.slide);
	}
	onSlideChanged(e) {
		console.debug('Item`s position after changes: ', e.item);
		console.debug('Slide`s position after changes: ', e.slide);
	}
	render() {
		// console.log("test render :",this.props.uniqueCartId.cart_id ? this.props.uniqueCartId.cart_id : '');
		const {
			product_id,
			name,
			description,
			price,
			discounted_price,
			image,
			image_2,
			thumbnail,
		} = this.props && this.props.prodData ? this.props.prodData : '';
		var items = [];
		const graphImage = image
			? require(`../../assets/product_images/${image}`)
			: '';
		const Aimage_2 = image_2
			? require(`../../assets/product_images/${image_2}`)
			: '';
		const Athumbnail = thumbnail
			? require(`../../assets/product_images/${thumbnail}`)
			: '';
		items = [...items, Aimage_2, Athumbnail];
		const average = _.meanBy(this.props.prodReview, (p) => p.rating);
		const round = _.round(average, 2);
		return (
			<div className={`ui grid left aligned`}>
				<div className='seven wide column'>
					<div id={product_id}>
						<div>
							<img
								className='ui fluid image'
								id={product_id}
								src={Object.values(graphImage)}
								alt={thumbnail}
							/>
						</div>

						<AliceCarousel
							mouseDragEnabled
							responsive={this.state.aliceResponsive}
							items={items}
							dotsDisabled
							infinite={false}
							autoPlayInterval={2000}
							autoPlayDirection='rtl'
							autoPlay
							fadeOutAnimation
							onSlideChange={this.onSlideChange}
							onSlideChanged={this.onSlideChanged}>
							<img
								src={Object.values(graphImage)}
								className='ui small image'
								alt={description}
							/>
							<img
								src={Object.values(Aimage_2)}
								className='ui small image'
								alt={description}
							/>
							<img
								src={Object.values(Athumbnail)}
								className='ui small image'
								alt={description}
							/>
						</AliceCarousel>
					</div>
				</div>
				<div className='nine wide column'>
					<div className='ui list'>
						<div className='item'>
							{round ? (
								<Fragment>
									<button
										className='button basic ui'
										onClick={(e) => {
											this.setState({ status: !this.state.status });
										}}>
										<div className='ui large star rating'>
											{_.times(round, (i) => (
												<i id={round} className='icon yellow' key={i} />
											))}
										</div>
									</button>
								</Fragment>
							) : (
								''
							)}
						</div>
						<div className='item'>
							<h4 className='ui header'>{name ? name : ''}</h4>
						</div>
						<div className='item'>
							<span className='ui red lebel big '>{`Regular Price :${
								price ? price : ''
							} Discounted Price :${
								discounted_price ? discounted_price : ''
							}`}</span>
						</div>
						<div className='item'>
							<h4 className='ui header'>Color</h4>
							{this.renderProductColor()}
						</div>
						<div className='item'>
							<h4 className='ui header'>Size</h4>
							{this.renderProductSize()}
						</div>
						<div className='item'>
							<div className='ui search focus'>
								<button
									className='ui circular icon button'
									onClick={(e) => {
										this.setState({ quantity: this.state.quantity + 1 });
									}}>
									<i className='icon plus'></i>
								</button>
								<input
									className='prompt'
									style={{ textAlign: 'center' }}
									onChange={(e) => {
										this.setState({ quantity: this.state.quantity });
									}}
									value={this.state.quantity}
								/>
								<button
									className='ui circular icon button'
									onClick={(e) => {
										this.setState({
											quantity:
												this.state.quantity >= 2
													? this.state.quantity - 1
													: this.state.quantity,
										});
									}}>
									<i className='icon minus'></i>
								</button>
							</div>
						</div>
						<div className='item'>
							<button className={`ui red circular button `} onClick={this.add}>
								Add to Cart
							</button>

							<button className='ui basic button'>
								<i className='icon heart outline red'></i> Add to Wishlist
							</button>
						</div>
						<div
							className={`ui error message ${
								this.state.validate ? '' : 'transition hidden'
							}`}>
							<div className='header'>
								{!this.state.validate ? '' : 'please fill all fields'}
							</div>
							<ul className='list'>
								<li>
									You must include both a upper and lower case letters in your
									password.
								</li>
								<li>You need to select your home country.</li>
							</ul>
						</div>
					</div>
				</div>
				<Modal
					title='Review'
					content={this.renderProReview()}
					status={this.state.status}
					onDismiss={() => this.setState({ status: false })}
				/>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => ({
	fetchProdDetails: (data) => dispatch(fetchProdDetails(data)),
	fetchProd: (data) => dispatch(fetchProd(data)),
	fetchProdReviews: (data) => dispatch(fetchProdReviews(data)),
	addToCart: () => dispatch(addToCart()),
	addShoppingCart: (data) => dispatch(addShoppingCart(data)),
});
const mapStateToProps = (state) => {
	return {
		prodsAttr: state.ecomdata.selProdDetails,
		prodData: state.ecomdata.selProdData,
		prodReview: state.ecomdata.selProdReview,
		uniqueCartId: state.ecomdata.uniqueCartId,
	};
};
ProdDetails.propTypes = {
	price: PropTypes.number,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProdDetails);
