import React from 'react';
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

const Search = ({ data: { error, loading, search } }) => {
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

export default graphql(searchQuery, {
	options: (props) => ({
		variables: {
			limit: props.limit,
			query: props.query
		}
	})
})(Search);
