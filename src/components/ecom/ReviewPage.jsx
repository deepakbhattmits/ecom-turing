/** @format */
import _ from 'lodash';
//  ReviewPage
const ReviewPage = ({ ratings, name }) => (
	<div className='ui relaxed divided list'>
		<div className='item'>
			<div className='ui large star rating'>
				{_.times(ratings, (i) => (
					<i className='icon yellow' key={i} />
				))}
			</div>
			<div className='content '>
				<span className='header'> {name}</span>
				<div className='description'>Updated 10 mins ago</div>
			</div>
		</div>
	</div>
);
// }
export default ReviewPage;
