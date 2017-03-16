import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

class Search extends Component {
	state = {
		searchResults: [],
		search: ''
	}
	componentDidMount() {
		if (window.location.search) {
			const params = new Map(window.location.search.slice(1)
									.split('&')
									.map((param) => param.split('=')))
			const query = params.get('q');
			if (query) {
				this.fetchSearchResults(query)
					.then((searchResults) => {
						this.setState({
							searchResults: searchResults.results,
							search: decodeURIComponent(query)
						})
					})
					.catch(e => console.error(e))
			}
		}
	}
	// componentDidUpdate(prevProps, prevState) {
	// 	if (prevState.search !== this.state.search) {
	// 		const params = new Map(window.location.search.slice(1)
	// 								.split('&')
	// 								.map((param) => param.split('=')))
	// 		const query = params.get('q');
	// 		if (query) {
	// 			this.fetchSearchResults(query)
	// 				.then((searchResults) => {
	// 					this.setState({
	// 						searchResults: searchResults.results,
	// 						search: decodeURIComponent(query)
	// 					})
	// 				})
	// 				.catch(e => console.error(e))
	// 		}
	// 	}
	// }
	fetchSearchResults(query) {
		return fetch(`/api/search?q=${query}`, {
			mode: 'cors'
		}).then(r => r.json())
	}
	handleSearch = (evt) => {
		evt.preventDefault();
		const sanitizedSearch = encodeURIComponent(this.state.search);
		this.props.history.push(`?q=${sanitizedSearch}`);
		this.fetchSearchResults(sanitizedSearch)
			.then((searchResults) => {
				console.log(searchResults.results);
				this.setState({
					searchResults: searchResults.results
				})
			})
			.catch(e => console.error(e))

	}
	handleSearchChange = (evt) => {
		this.setState({
			search: evt.target.value
		})
	}
	render() {
		return (
			<div>
				<form action="" onSubmit={this.handleSearch}>
					<input type="text" id="main-search" value={this.state.search} onChange={this.handleSearchChange} />
					<button type='submit'>Submit</button>
				</form>
				<ol>
					{this.state.searchResults.map((result) => (
						<li key={result.collectionName}>
							<Link to={{
								pathname: `podcasts/${slugify(result.collectionName).toLowerCase()}`,
								state: {
									id: result.collectionId
								}
								}}>
								<img src={result.artworkUrl100} alt={result.collectionName} />
								{result.collectionName}
							</Link>
						</li>
					))}
				</ol>
			</div>
		)
	}
}

export default Search;
