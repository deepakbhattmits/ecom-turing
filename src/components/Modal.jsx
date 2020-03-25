/** @format */

import React from 'react';
import { createPortal } from 'react-dom';

const Modal = props => {
	// console.log('TEST: ', props);
	return createPortal(
		<div
			onClick={props.onDismiss}
			className={`ui dimmer page ${
				props.status ? 'visible active' : 'hidden'
			}`}>
			<div
				onClick={e => {
					e.stopPropagation();
				}}
				className={`ui text modal transition scrolling  ${
					props.status ? 'visible active' : 'hidden'
				}`}>
				<i className='close icon' onClick={props.onDismiss}></i>
				<div className='header'>{props.title}</div>
				<div className='content'>{props.content}</div>
			</div>
		</div>,

		document.querySelector('#modal')
	);
};
export default Modal;
