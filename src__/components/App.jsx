/** @format */
// import { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from '../history';
import CategoryPage from './ecom/CategoryPage';
import Header from './Header';
import Footer from './Footer';
import MainPage from './ecom/MainPage';
import CartPage from './ecom/CartPage';
import ProdDetails from './ecom/ProdDetails';
import ReviewPage from './ecom/ReviewPage';
const App = () => {
	// console.log('TEST :  > ');
	return (
		<div className='ui grid center aligned'>
			<div className='ui fifteen wide column'>
				<Router history={createBrowserHistory}>
					<div className='ui header'>
						<Header />
					</div>

					<main className='ui content-body'>
						<Switch>
							<Route path='/' exact component={MainPage} />
							<Route path='/ecom/categories/:id' component={CategoryPage} />
							<Route path='/ecom/cartPage' component={CartPage} />
							<Route path='/ecom/prodDetails/:id' component={ProdDetails} />
							<Route path='/ecom/ReviewPage/:id' component={ReviewPage} />
						</Switch>
					</main>
					<div className='ui footer'>
						<Footer />
					</div>
				</Router>
			</div>
		</div>
	);
};

export default App;
