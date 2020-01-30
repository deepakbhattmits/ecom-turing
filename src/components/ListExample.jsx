/** @format */

import React, { Component } from 'react';

class ListExample extends Component {
	constructor(props) {
		super(props);
		this.Ref = React.createRef();
	}
	componentDidMount() {
		this.moveFocus();
	}
	moveFocus() {
		const node = this.Ref.current;
		console.log('TEST :', node);
		node.addEventListener('keydown', function(e) {
			const active = document.activeElement;
			if (e.keyCode === 40 && active.nextSibling) {
				active.nextSibling.focus();
			}
			if (e.keyCode === 38 && active.previousSibling) {
				active.previousSibling.focus();
			}
		});
	}
	render() {
		return (
			<div ref={this.Ref}>
				<div tabIndex='0'>First</div>
				<div tabIndex='1'>Second</div>
				<div tabIndex='2'>Third</div>
			</div>
		);
	}
}
export default ListExample;
