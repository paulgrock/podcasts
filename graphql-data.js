import fetchJsonAndParse from './resolvers/fetch-and-parse';
import topPodResolver from './resolvers/top-pods';
import episodeListing from './resolvers/lookup';
import searchResolver from './resolvers/search';

const typeDefs = `
	type Query {
		"""
		The top podcasts at the moment
		"""
		topPods(limit: Int, offset: Int): [TopPod]
		podcast(id: ID!, limit: Int): Podcast
		"""
		Search itunes podcast directory by name
		"""
		search(query: String, limit: Int): Search
		jsonFeed(url: String!): JSONFeed
	}

	type TopPod {
		collectionId: ID,
		collectionName: String,
		artworkUrl100: String
	}

	type Podcast {
		header: PodcastHeader
		episodes: [EpisodeList]
	}

	type Search {
		results: [PodcastHeader]
	}

	type EpisodeList {
		artworkUrl160: String,
		artworkUrl600: String,
		episodeFileExtension: String,
		episodeContentType: String,
		trackViewUrl: String,
		collectionViewUrl: String,
		trackTimeMillis: Int,
		contentAdvisoryRating: String,
		artworkUrl60: String,
		episodeUrl: String,
		previewUrl: String,
		shortDescription: String,
		wrapperType: String,
		country: String,
		description: String,
		episodeGuid: ID,
		kind: String,
		trackId: ID,
		trackName: String,
		releaseDate: String,
		collectionId: ID,
		collectionName: String,
		feedUrl: String,
		closedCaptioning: String
	}

	type PodcastHeader {
		wrapperType: String,
		kind: String,
		collectionId: ID,
		trackId: ID,
		artistName: String,
		collectionName: String,
		trackName: String,
		collectionCensoredName: String,
		trackCensoredName: String,
		collectionViewUrl: String,
		feedUrl: String,
		trackViewUrl: String,
		artworkUrl30: String,
		artworkUrl60: String,
		artworkUrl100: String,
		collectionPrice: Int,
		trackPrice: Int,
		trackRentalPrice: Int,
		collectionHdPrice: Int,
		trackHdPrice: Int,
		trackHdRentalPrice: Int,
		releaseDate: String,
		collectionExplicitness: String,
		trackExplicitness: String,
		trackCount: Int,
		country: String,
		currency: String,
		primaryGenreName: String,
		contentAdvisoryRating: String,
		artworkUrl600: String
	}

	type JSONFeed {
		version: String,
		title: String,
		home_page_url: String,
		feed_url: String,
		icon: String,
		favicon: String,
		author: JSONFeedAuthor,
		items: [JSONFeedItem]
	}

	type JSONFeedItem {
		title: String
		id: ID
		url: String
		external_url: String
		author: JSONFeedAuthor,
		content_html: String
	}

	type JSONFeedAuthor {
		url: String,
		name: String
	}
`;

const resolvers = {
	Query: {
		topPods: async (_, args) => await topPodResolver(args),
		podcast: async (_, args) => await episodeListing(args),
		search: async (_, args) => await searchResolver(args),
		jsonFeed: async (_, { url }) => await fetchJsonAndParse(url)
	}
};

export { typeDefs, resolvers };
