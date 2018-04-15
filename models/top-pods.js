import fetchJsonAndParse from './fetch-and-parse';

export default async function({ limit = 10 }) {
	const topPodsJSON = await fetchJsonAndParse(
		`https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/json`
	);
	if (limit === 1) {
		topPodsJSON.feed.entry = [topPodsJSON.feed.entry];
	}
	return topPodsJSON.feed.entry.map(entry => ({
		collectionId: entry.id.attributes['im:id'],
		collectionName: entry['im:name'].label,
		artworkUrl100: entry['im:image'][entry['im:image'].length - 1].label
	}));
}
