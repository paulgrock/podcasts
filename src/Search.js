import React, { Component } from 'react';
import CollectionListItem from './CollectionListItem';

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
		} else {
			fetch('/api/top-podcasts', {
				mode: 'cors'
			})
				.then(r => r.json())
				.then((searchResults) => {
					this.setState({
						searchResults
					})
				})
				.catch(e => console.error(e))

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
						<CollectionListItem key={result.collectionId} result={result} />
					))}
				</ol>
			</div>
		)
	}
}

export default Search;
