/** @format */
//    RainBow
const RainBow = (WrappedComponent) => {
	const colours = ['red', 'blue', 'green', 'pink', 'cyan'];
	const randomColour = colours[Math.floor(Math.random() * 4)];
	const textColour = '#fff';
	const className = randomColour + '--text';
	return (props) => {
		return (
			<div
				className={`ui section ${className}`}
				style={{ backgroundColor: `${randomColour}`, color: `${textColour}` }}>
				<WrappedComponent {...props} />
			</div>
		);
	};
};
export default RainBow;
