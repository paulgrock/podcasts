import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLNonNull
} from "graphql";

import topPods from "./models/top-pods";
import EpisodeListType from "./models/episodes-schema";
import PodcastHeaderType from "./models/podcast-header";
import episodeListing from "./models/lookup";

const TopPodType = new GraphQLObjectType({
	name: "TopPod",
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
	name: "PodcastListing",
	fields: {
		header: {
			type: PodcastHeaderType
		},
		episodes: {
			type: new GraphQLList(EpisodeListType)
		}
	}
});

// Construct a schema, using GraphQL schema language
var schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "Query",
		fields: {
			topPods: {
				name: "topPods",
				args: {
					limit: {
						type: GraphQLInt
					}
				},
				type: new GraphQLList(TopPodType),
				async resolve(_, {
					limit
				}) {
					return await topPods(limit);
				}
			},
			anotherThing: {
				type: GraphQLString,
				resolve() {
					return "another thing";
				}
			},
			podcast: {
				name: "podcast",
				description: "Fetch a specific podcast by id from itunes",
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
					var podcast = await episodeListing(args);
					console.log(podcast)
					return {
						header: podcast.header,
						episodes: podcast.episodes
					}
				}
			}
		},
	}),
	mutation: new GraphQLObjectType({
		name: 'Mutation',
		description: 'Changable things',
		fields:() => ({
			logSomething: {
				type: new GraphQLObjectType({
					name: 'mutationThing',
					fields:() => ({
						str: {
							type: GraphQLString
						}
					})
				}),
				args: {
					str: {type: new GraphQLNonNull(GraphQLString)}
				},
				resolve: (_, {str}, something) => {
					return {str};
				}
			}
		})
	})
});

export default schema;
