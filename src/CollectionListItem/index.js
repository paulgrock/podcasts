import React from 'react';
import slugify from 'slugify';
import { Link } from 'react-router-dom';

const CollectionList = function({ result }) {
	return (
		<li key={result.collectionName}>
			<Link
				to={{
					pathname: `podcasts/${slugify(result.collectionName).toLowerCase()}`,
					state: {
						id: result.collectionId
					}
				}}
			>
				<img src={result.artworkUrl100} alt={result.collectionName} />
				{result.collectionName}
			</Link>
		</li>
	);
};

export default CollectionList;
