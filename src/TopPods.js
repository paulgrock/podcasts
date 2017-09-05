import React from 'react';
import CollectionListItem from './CollectionListItem';
import { gql, graphql } from 'react-apollo';

let topPodcastsQuery = gql`
	query topPodsQuery($limit: Int = 5, $offset: Int) {
		topPods(limit: $limit, offset: $offset) {
			collectionId
			collectionName
			artworkUrl100
		}
	}
`

const TopPods = ({ data: { error, loading, topPods, fetchMore } }) => {
	return (
		topPods ? (
			<ol>
			{topPods.map((result) => (
				<CollectionListItem key={result.collectionId} result={result} />
			))}
			</ol>
		) : null
	)
}

export default graphql(topPodcastsQuery, {
	options: (props) => ({
		variables: props
	})
})(TopPods);
