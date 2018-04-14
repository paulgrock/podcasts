import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const EpisodeListType = new GraphQLObjectType({
	name: 'EpisodeList',
	fields: {
		artworkUrl160: { type: GraphQLString },
		artworkUrl600: { type: GraphQLString },
		episodeFileExtension: { type: GraphQLString },
		episodeContentType: { type: GraphQLString },
		trackViewUrl: { type: GraphQLString },
		collectionViewUrl: { type: GraphQLString },
		trackTimeMillis: { type: GraphQLInt },
		contentAdvisoryRating: { type: GraphQLString },
		artworkUrl60: { type: GraphQLString },
		episodeUrl: { type: GraphQLString },
		previewUrl: { type: GraphQLString },
		shortDescription: { type: GraphQLString },
		wrapperType: { type: GraphQLString },
		country: { type: GraphQLString },
		description: { type: GraphQLString },
		episodeGuid: { type: GraphQLString },
		kind: { type: GraphQLString },
		trackId: { type: GraphQLInt },
		trackName: { type: GraphQLString },
		releaseDate: { type: GraphQLString },
		collectionId: { type: GraphQLInt },
		collectionName: { type: GraphQLString },
		feedUrl: { type: GraphQLString },
		closedCaptioning: { type: GraphQLString }
	}
});

export default EpisodeListType;
