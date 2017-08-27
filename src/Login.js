import React from 'react';
import './Modal.css';

export default ({match, history}) => {
	const close = (evt) => {
		evt.stopPropagation();
		history.goBack()
	}
	return (
		<div className="modal-container" onClick={close}>
			<div className="modal">
				<h3>Modal</h3>
				<button onClick={close}>Close</button>
			</div>
		</div>
	)
}
