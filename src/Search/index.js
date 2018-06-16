import React from 'react';
import CollectionListItem from '../CollectionListItem';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

let searchQuery = gql`
	query searchQuery($query: String!, $limit: Int = 10) {
		search(query: $query, limit: $limit) {
			results {
				collectionName
				collectionId
				collectionName
				artworkUrl100
			}
		}
	}
`;

const Search = ({ limit, query }) => (
	<Query query={searchQuery} variables={{ limit, query }}>
		{({ error, loading, data }) => {
			if (loading || error) {
				return <div />;
			}
			return (
				<ol>
					{data.search.results.map(result => (
						<CollectionListItem key={result.collectionId} result={result} />
					))}
				</ol>
			);
		}}
	</Query>
);

export default Search;
