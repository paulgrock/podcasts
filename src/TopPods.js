import React from 'react';
import CollectionListItem from './CollectionListItem';
import { gql, graphql } from 'react-apollo';

let topPodcastsQuery = gql`
	query topPodsQuery($limit: Int!) {
		topPods(limit: $limit) {
			collectionId
			collectionName
			artworkUrl100
		}
	}
`

const TopPods = ({ data: { error, loading, topPods } }) => {
	if (topPods) {
		return (
			<ol>
			{topPods.map((result) => (
				<CollectionListItem key={result.collectionId} result={result} />
			))}
			</ol>
		)
	}
	return null
}

export default graphql(topPodcastsQuery, {
	options: (props) => ({
		variables: {
			limit: 5
		}
	})
})(TopPods);
