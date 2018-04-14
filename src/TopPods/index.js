import React from 'react';
import CollectionListItem from '../CollectionListItem';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

let topPodcastsQuery = gql`
	query topPodsQuery($limit: Int = 5, $offset: Int) {
		topPods(limit: $limit, offset: $offset) {
			collectionId
			collectionName
			artworkUrl100
		}
	}
`;

const TopPods = () => (
	<Query query={topPodcastsQuery}>
		{({ error, loading, data }) => {
			if (loading) {
				return <div>Loading...</div>;
			}
			if (error) {
				return <div>Error</div>;
			}
			return (
				<ol>
					{data.topPods.map(result => (
						<CollectionListItem key={result.collectionId} result={result} />
					))}
				</ol>
			);
		}}
	</Query>
);

export default TopPods;
