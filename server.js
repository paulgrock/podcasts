import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {url} from './db';
import expressSession from 'express-session';
import schema from './schema';
import graphqlHTTP from 'express-graphql';

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

app.get('/', (req, res) => {
	res.send('ok');
})

app.use('/api/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV !== 'production'
}))

const start = function() {
	const server = app.listen(app.get('port'), () => {
		console.log(`Server listening on http://localhost:${server.address().port}`)
	});
}

export default start;
