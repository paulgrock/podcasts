import fetchItunesJsonAndParse from './fetch-and-parse';
/**
 * episode format
 * {
	artworkUrl160: 'http://is4.mzstatic.com/image/thumb/Music117/v4/7a/67/27/7a67270a-5c73-efbe-e2aa-11d2a63779aa/source/160x160bb.jpg',
	artworkUrl600: 'http://is4.mzstatic.com/image/thumb/Music117/v4/7a/67/27/7a67270a-5c73-efbe-e2aa-11d2a63779aa/source/600x600bb.jpg',
	episodeFileExtension: 'mp3',
	episodeContentType: 'audio',
	trackViewUrl: 'https://itunes.apple.com/us/podcast/rest-in-peace-mass-effect-kinda-funny-games-daily-08-21-17/id1247343210?i=1000391301426&mt=2&uo=4',
	collectionViewUrl: 'https://itunes.apple.com/us/podcast/kinda-funny-games-daily/id1247343210?mt=2&uo=4',
	trackTimeMillis: 4047000,
	contentAdvisoryRating: 'Clean',
	artworkUrl60: 'http://is2.mzstatic.com/image/thumb/Podcasts117/v4/80/83/e7/8083e7e4-83fb-08dd-da4c-c3c67518da2b/mza_8867518548687991338.jpg/60x60bb-85.jpg',
	episodeUrl: 'http://www.podtrac.com/pts/redirect.mp3/feeds.soundcloud.com/stream/338878232-kindafunnygamesdaily-kfgd-08212017.mp3',
	previewUrl: 'http://www.podtrac.com/pts/redirect.mp3/feeds.soundcloud.com/stream/338878232-kindafunnygamesdaily-kfgd-08212017.mp3',
	shortDescription: 'Danny and Greg run you through Xbox\'s Gamecom and…',
	wrapperType: 'podcastEpisode',
	country: 'USA',
	description: 'Danny and Greg run you through Xbox\'s Gamecom and mourn the Mass Effect.',
	genres: [Array],
	episodeGuid: 'tag:soundcloud,2010:tracks/338878232',
	kind: 'podcast-episode',
	trackId: 391301426,
	trackName: 'Rest in Peace, Mass Effect - Kinda Funny Games Daily 08.21.17',
	releaseDate: '2017-08-21T20:35:48Z',
	collectionId: 1247343210,
	collectionName: 'Kinda Funny Games Daily',
	feedUrl: 'http://feeds.soundcloud.com/users/soundcloud:users:311210600/sounds.rss',
	closedCaptioning: 'none',
	artistIds: []
}
 */

export default async function ({id, limit = 5}) {
	const episodeListing = await fetchItunesJsonAndParse(`https://itunes.apple.com/lookup?id=${id}&country=us&media=podcast&entity=podcastEpisode&limit=${limit}`)
	let { results } = episodeListing;
	return {
		header: results.find(result => result.kind === 'podcast'),
		episodes: results.filter(result => result.kind !== 'podcast')
	}
};
