const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', process.env.SERVER_PORT || 3001);

async function fetchItunesJsonAndParse(url) {
	const fetchP = await fetch(url)
	const json = fetchP.json();
	return json;
}

app.get('/api/search', (req, res) => {
	fetchItunesJsonAndParse(`https://itunes.apple.com/search?media=podcast&entity=podcast&term=${req.query.q}`).
		then((results) => res.json(results)).
		catch(e => console.error(e));
})

app.get('/api/lookup', (req, res) => {
	fetchItunesJsonAndParse(`https://itunes.apple.com/lookup?id=${req.query.id}&country=us&media=podcast&entity=podcastEpisode&limit=5`).
		then((searchResults) => res.json(searchResults)).
		catch(e => console.error(e));
})

app.get('/api/top-podcasts', (req, res) => {
	fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=10/json')
})

const server = app.listen(app.get('port'), () => {
	console.log(`Server listening on http://localhost:${server.address().port}`)
});
