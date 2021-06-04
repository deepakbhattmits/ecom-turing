/** @format */

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDepartments } from '../../actions';
//  MainPage
const MainPage = (props) => {
	const departments = useSelector((state) => state.ecomdata.departments);
	const dispatch = useDispatch();
	useEffect(() => {
		// console.log('mainpage', departments);
		if (!departments) {
			dispatch(fetchDepartments());
		}
	}, [departments, dispatch]);
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
	return (
		<>
			<section>
				<article className='post'>
					<h1>The Principles of Good Design</h1>
					<p className='post-meta'>
						Circa 2014 <span>by</span> Ian Daniel Stewart
					</p>

					<p>
						Is <strong>beauty</strong> objectively true? Are there principles
						you can use to guide you to it in your work? Can designers from both
						the sciences and the arts look at each others work and find{' '}
						<strong className='sevenhundred'>beauty</strong>? These are
						important questions for all designers.
					</p>

					<p>
						For those of us who design things … we need to be able to recognize
						it. We need good taste to make good things. Instead of treating{' '}
						<strong className='eighthundred'>beauty</strong> as an airy
						abstraction, to be either blathered about or avoided depending on
						how one feels about airy abstractions, let’s try considering it as a
						practical question: how do you make good stuff?
					</p>
				</article>
			</section>
			<div className='ui vertical stripe segment inverted'>
				<div className='ui middle aligned stackable grid container'>
					<div className='row'>
						<div className='eight wide column'>
							<h1 className='ui header'>Shop By Category</h1>
							<button className='ui huge button'>Check Them Out</button>
						</div>
						<div className='six wide right floated column'>
							<img
								src='https://via.placeholder.com/400x300.png?text=Cat.1'
								className='ui large bordered rounded image'
								alt='placeholder'
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
									alt='placeholder'
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
					<button className='ui large button'>Read More</button>
					<h4 className='ui horizontal header divider'>
						<button clssName='ui'>Case Studies</button>
					</h4>
					<h3 className='ui header'>Did We Tell You About Our Bananas?</h3>
					<p>
						Yes I know you probably disregarded the earlier boasts as
						non-sequitur filler content, but its really true. It took years of
						gene splicing and combinatory DNA research, but our bananas can
						really dance.
					</p>
				</div>
			</div>
		</>
	);
};
export default MainPage;
