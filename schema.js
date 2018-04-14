import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLNonNull
} from 'graphql';

import topPods from './models/top-pods';
import EpisodeListType from './models/episodes-schema';
import PodcastListType from './models/podcast';
import episodeListing from './models/lookup';
import search from './models/search';

const TopPodType = new GraphQLObjectType({
	name: 'TopPod',
	fields: {
		collectionId: {
			type: GraphQLString
		},
		collectionName: {
			type: GraphQLString
		},
		artworkUrl100: {
			type: GraphQLString
		}
	}
});

const PodcastType = new GraphQLObjectType({
	name: 'PodcastListing',
	fields: {
		header: {
			type: PodcastListType
		},
		episodes: {
			type: new GraphQLList(EpisodeListType)
		}
	}
});

const SearchType = new GraphQLObjectType({
	name: 'SearchListing',
	fields: {
		results: {
			type: new GraphQLList(PodcastListType)
		}
	}
});

// Construct a schema, using GraphQL schema language
var schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: {
			topPods: {
				name: 'topPods',
				args: {
					limit: {
						type: GraphQLInt
					},
					offset: {
						type: GraphQLInt
					}
				},
				type: new GraphQLList(TopPodType),
				async resolve(_, args) {
					return await topPods(args);
				}
			},
			podcast: {
				name: 'podcast',
				description: 'Fetch a specific podcast by id from itunes',
				type: PodcastType,
				args: {
					id: {
						type: new GraphQLNonNull(GraphQLInt)
					},
					limit: {
						type: GraphQLInt
					}
				},
				async resolve(_, args) {
					return await episodeListing(args);
				}
			},
			search: {
				name: 'search',
				deprecation: 'Search for a podcast',
				type: SearchType,
				args: {
					query: {
						type: GraphQLString
					},
					limit: {
						type: GraphQLInt
					}
				},
				async resolve(_, args) {
					return await search(args);
				}
			}
		}
	}),
	mutation: new GraphQLObjectType({
		name: 'Mutation',
		description: 'Changable things',
		fields: () => ({
			logSomething: {
				type: new GraphQLObjectType({
					name: 'mutationThing',
					fields: () => ({
						str: {
							type: GraphQLString
						}
					})
				}),
				args: {
					str: { type: new GraphQLNonNull(GraphQLString) }
				},
				resolve: (_, { str }) => {
					return { str };
				}
			}
		})
	})
});

export default schema;
