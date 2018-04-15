import fetch from 'isomorphic-fetch';

export default async function fetchJsonAndParse(url) {
	const fetchP = await fetch(url);
	return await fetchP.json();
}
