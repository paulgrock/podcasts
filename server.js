const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const mongoose = require('mongoose');
const dbConf = require('./db.js');
const expressSession = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('dotenv').config()

app.set('port', process.env.SERVER_PORT || 3001);

const {
  SECRET
} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(dbConf.url).then(
	() => console.log('connected')
)

// app.use(expressSession({
//   secret: SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     httpOnly: true
//   }
// }));

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
	fetchItunesJsonAndParse('https://itunes.apple.com/us/rss/toppodcasts/limit=10/json')
		.then((results) => {
			console.log(results);
			const modifiedFeed = results.feed.entry.map(entry => {
				return {
					collectionId: entry.id.attributes["im:id"],
					collectionName: entry['im:name'].label,
					artworkUrl100: entry['im:image'][entry['im:image'].length - 1].label
				}
			})
			res.json(modifiedFeed);
		})
})

const server = app.listen(app.get('port'), () => {
	console.log(`Server listening on http://localhost:${server.address().port}`)
});
