/** @format */
// import { Component } from 'react';
// import { connect } from 'react-redux';
// import {
// 	fetchCategoryProd,
// 	fetchCategoriesData,
// 	fetchAttributeSize,
// 	fetchAttributeColor,
// } from '../../actions';
// import ProductList from './ProductList';
// // todo : functional CategoryPage
// class CategoryPage extends Component {
// 	componentDidMount() {
// 		this.props.fetchCategoryProd(this.props.match.params.id);
// 		this.props.fetchCategoriesData(this.props.match.params.id);
// 		this.props.fetchAttributeSize();
// 		this.props.fetchAttributeColor();
// 	}
// 	render() {
// 		console.log('test:', this.props);
// 		const catId = this.props.ecomSelCat.selCat.category_id;
// 		const catName = this.props.ecomSelCat.selCat.name;
// 		const catDescription = this.props.ecomSelCat.selCat.description;
// 		return (
// 			<div className='ui'>
// 				<h2 className='ui center aligned header'>{catName}</h2>
// 				<p>{catDescription} </p>

// 				<ProductList catId={catId} />
// 			</div>
// 		);
// 	}
// }
// const mapDispatchToProps = (dispatch) => ({
// 	fetchAttributeSize: () => dispatch(fetchAttributeSize()),
// 	fetchAttributeColor: () => dispatch(fetchAttributeColor()),
// 	fetchCategoryProd: (data) => dispatch(fetchCategoryProd(data)),
// 	fetchCategoriesData: (data) => dispatch(fetchCategoriesData(data)),
// });
// const mapStateToProps = (state, ownProps) => {
// 	console.log('ownprops : ', ownProps);
// 	return {
// 		ecomdata: state.ecomdata[ownProps.match.params.id],
// 		ecomSelCat: state.ecomSelCat,
// 	};
// };
// // fetchCategoriesData
// export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);

/** @format */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchCategoryProd,
	fetchCategoriesData,
	fetchAttributeSize,
	fetchAttributeColor,
} from '../../actions';
import ProductList from './ProductList';
// todo : functional CategoryPage
const CategoryPage = (props) => {
	// console.log('CategoryPage TEST :', props);
	const dispatch = useDispatch();
	const id = props.match.params.id;
	const ecomSelCat = useSelector((state) => state.ecomSelCat);
	const catId = ecomSelCat.selCat.category_id;
	const catName = ecomSelCat.selCat.name;
	const catDescription = ecomSelCat.selCat.description;
	useEffect(() => {
		dispatch(fetchCategoryProd(id));
		dispatch(fetchCategoriesData(id));
		dispatch(fetchAttributeSize());
		dispatch(fetchAttributeColor());
	}, [dispatch, id]);
	return (
		<div className='ui'>
			<h2 className='ui center aligned header'>{catName}</h2>
			<p>{catDescription} </p>

			<ProductList catId={catId} />
		</div>
	);
};
export default CategoryPage;
