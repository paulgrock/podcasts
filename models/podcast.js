import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const PodcastHeaderType = new GraphQLObjectType({
	name: 'PodcastHeader',
	fields: {
		wrapperType: { type: GraphQLString },
		kind: { type: GraphQLString },
		collectionId: { type: GraphQLInt },
		trackId: { type: GraphQLInt },
		artistName: { type: GraphQLString },
		collectionName: { type: GraphQLString },
		trackName: { type: GraphQLString },
		collectionCensoredName: { type: GraphQLString },
		trackCensoredName: { type: GraphQLString },
		collectionViewUrl: { type: GraphQLString },
		feedUrl: { type: GraphQLString },
		trackViewUrl: { type: GraphQLString },
		artworkUrl30: { type: GraphQLString },
		artworkUrl60: { type: GraphQLString },
		artworkUrl100: { type: GraphQLString },
		collectionPrice: { type: GraphQLInt },
		trackPrice: { type: GraphQLInt },
		trackRentalPrice: { type: GraphQLInt },
		collectionHdPrice: { type: GraphQLInt },
		trackHdPrice: { type: GraphQLInt },
		trackHdRentalPrice: { type: GraphQLInt },
		releaseDate: { type: GraphQLString },
		collectionExplicitness: { type: GraphQLString },
		trackExplicitness: { type: GraphQLString },
		trackCount: { type: GraphQLInt },
		country: { type: GraphQLString },
		currency: { type: GraphQLString },
		primaryGenreName: { type: GraphQLString },
		contentAdvisoryRating: { type: GraphQLString },
		artworkUrl600: { type: GraphQLString }
	}
});

export default PodcastHeaderType;
