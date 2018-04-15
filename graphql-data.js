import { buildSchema } from 'graphql';
import fetchJsonAndParse from './models/fetch-and-parse';

import topPods from './models/top-pods';
import episodeListing from './models/lookup';
import search from './models/search';

const schema = buildSchema(`
	type Query {
		topPods(limit: Int, offset: Int): [TopPod]
		podcast(id: Int!, limit: Int): Podcast
		search(query: String, limit: Int): Search
		jsonFeed(url: String!): JSONFeed
	}

	type TopPod {
		collectionId: String,
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
		episodeGuid: String,
		kind: String,
		trackId: Int,
		trackName: String,
		releaseDate: String,
		collectionId: Int,
		collectionName: String,
		feedUrl: String,
		closedCaptioning: String
	}

	type PodcastHeader {
		wrapperType: String,
		kind: String,
		collectionId: Int,
		trackId: Int,
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
		id: String
		url: String
		external_url: String
		author: JSONFeedAuthor,
		content_html: String
	}

	type JSONFeedAuthor {
		url: String,
		name: String
	}
`);

const rootValue = {
	topPods: async args => await topPods(args),
	podcast: async args => await episodeListing(args),
	search: async args => await search(args),
	jsonFeed: async ({ url }) => await fetchJsonAndParse(url)
};

export { schema, rootValue };
