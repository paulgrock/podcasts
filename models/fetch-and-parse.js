export default async function fetchItunesJsonAndParse(url) {
	const fetchP = await fetch(url)
	return await fetchP.json();
}
