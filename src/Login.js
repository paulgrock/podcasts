import React, {Component} from 'react';
import './Modal.css';

class Login extends Component {
	close = evt => {
		evt.stopPropagation();
		window.history.goBack();
	};

	render() {
		const {username, password} = this.state;
		return (
			<div className="modal-container" onClick={this.close}>
				<div className="modal">
					<h3>Modal</h3>
					<form>
						<input type="text" value={username} />
						<input type="password" value={password} />
					</form>
					<button onClick={this.close}>Close</button>
				</div>
			</div>
		);
	}
}

export default Login;