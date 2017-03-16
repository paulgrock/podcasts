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

app.get('/api/search', (req, res) => {
	fetch(`https://itunes.apple.com/search?media=podcast&entity=podcast&term=${req.query.q}`).
		then((r) => r.json()).
		then((searchResults) => res.json(searchResults)).
		catch(e => console.error(e));
})

app.get('/api/lookup', (req, res) => {
	fetch(`https://itunes.apple.com/lookup?id=${req.query.id}&country=us&media=podcast&entity=podcastEpisode&limit=5`).
		then((r) => r.json()).
		then((searchResults) => {
			console.log(searchResults);
			return res.json(searchResults)
		}).
		catch(e => console.error(e));
})

app.get('/api/top-podcasts', (req, res) => {
	fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=10/json')
})

const server = app.listen(app.get('port'), () => {
	console.log(`Server listening on http://localhost:${server.address().port}`)
});
