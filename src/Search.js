import React, { Component } from 'react';
import CollectionListItem from './CollectionListItem';
import { gql, graphql } from 'react-apollo';

let searchQuery = gql`
	query podcastQuery($query: String!, $limit: Int = 10) {
		search(query: $query, limit: $limit) {
			results {
				collectionName
				collectionId
				collectionName
				artworkUrl100
			}
		}
	}
`

class Search extends Component {
	render() {
		const { data: { error, loading, search } } = this.props;

		return (
			search && search.results ? (
				<ol>
					{search.results.map((result) => (
						<CollectionListItem key={result.collectionId} result={result} />
					))}
				</ol>
			) : null
		)
	}
}


export default graphql(searchQuery, {
	options: (props) => ({
		variables: {
			limit: props.limit,
			query: props.query
		}
	})
})(Search);
