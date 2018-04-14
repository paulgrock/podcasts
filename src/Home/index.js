import React, { Component } from 'react';
import TopPods from '../TopPods';
import Search from '../Search';

class Home extends Component {
	state = {
		query: ''
	};
	componentDidMount() {
		if (window.location.search) {
			const params = new URLSearchParams(window.location.search);
			const query = params.get('q');
			this.setState({
				query: decodeURIComponent(query)
			});
		}
	}

	handleSearch = evt => {
		evt.preventDefault();
		const sanitizedSearch = encodeURIComponent(this.state.query);
		this.props.history.push(`?q=${sanitizedSearch}`);
	};

	handleSearchChange = evt => {
		this.setState({
			query: evt.target.value
		});
	};
	render() {
		let { query } = this.state;
		return (
			<div>
				<form action="" onSubmit={this.handleSearch}>
					<input
						type="search"
						id="main-search"
						value={this.state.query}
						onChange={this.handleSearchChange}
					/>
					<button type="submit">Submit</button>
				</form>
				{query ? <Search query={query} /> : <TopPods />}
			</div>
		);
	}
}

export default Home;
