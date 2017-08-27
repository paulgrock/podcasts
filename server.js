import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fetch from 'isomorphic-fetch';
import mongoose from 'mongoose';
import {url} from './db';
import expressSession from 'express-session';
import schema from './schema';
import graphqlHTTP from 'express-graphql';
import fetchTopPods from './models/top-pods';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

import {config} from 'dotenv';

app.set('port', process.env.SERVER_PORT || 3001);

const {
  SECRET_KEY
} = process.env;

mongoose.Promise = global.Promise;
// mongoose.connect(dbConf.url, {
// 	useMongoClient: true
// }).then(
// 	() => console.log('connected')
// ).catch(err => console.error(err));

app.use(expressSession({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true
  }
}));

async function fetchItunesJsonAndParse(url) {
	const fetchP = await fetch(url)
	return await fetchP.json();
}

app.get('/', (req, res) => {
	res.send('ok');
})

app.get('/api/search', async (req, res, next) => {
	const searchJSON = await fetchItunesJsonAndParse(`https://itunes.apple.com/search?media=podcast&entity=podcast&term=${req.query.q}`);
	res.json(searchJSON);
})

app.get('/api/lookup/:id', async (req, res) => {
	let {limit} = req.query;
	if (limit == null) {
		limit = 5;
	}
	const lookup = await fetchItunesJsonAndParse(`https://itunes.apple.com/lookup?id=${req.params.id}&country=us&media=podcast&entity=podcastEpisode&limit=${limit}`);
	console.log(lookup);
	res.json(lookup);
})

app.use('/api/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV !== 'production'
}))

app.get('/api/top-podcasts', async (req, res, next) => {
	res.json(await fetchTopPods());
})

const start = function() {
	const server = app.listen(app.get('port'), () => {
		console.log(`Server listening on http://localhost:${server.address().port}`)
	});
}

export default start;
