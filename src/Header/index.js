import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const Header = () => (
	<header>
		<div className="app-header">
			<h1 className="app-title">Podcasting</h1>
			<div className="login-signup">
				<Link
					to={{
						pathname: `/login`,
						state: { modal: true }
					}}
				>
					Login
				</Link>
				<Link
					to={{
						pathname: `/signup`,
						state: { modal: true }
					}}
				>
					Sign Up
				</Link>
			</div>
		</div>
		<nav>
			<Link to="/">Home</Link>
		</nav>
	</header>
);

export default Header;
