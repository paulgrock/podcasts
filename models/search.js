import fetchItunesJsonAndParse from './fetch-and-parse';

export default async function({query, limit}) {
	const searchJSON = await fetchItunesJsonAndParse(`https://itunes.apple.com/search?media=podcast&entity=podcast&term=${encodeURIComponent(query)}&limit=${limit}`);
	return searchJSON;
}
