import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import expressSession from 'express-session';
import { typeDefs, resolvers } from './graphql-data';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

const app = express();
// app.use(bodyParser.json());
// app.use(
// 	bodyParser.urlencoded({
// 		extended: true
// 	})
// );

app.set('port', process.env.SERVER_PORT || 3001);

// const { SECRET_KEY } = process.env;

mongoose.Promise = global.Promise;
// mongoose.connect(dbConf.url, {
// 	useMongoClient: true
// }).then(
// 	() => console.log('connected')
// ).catch(err => console.error(err));

// app.use(
// 	expressSession({
// 		secret: SECRET_KEY,
// 		resave: false,
// 		saveUninitialized: true,
// 		cookie: {
// 			httpOnly: true
// 		}
// 	})
// );

app.get('/', (req, res) => {
	res.send('ok');
});

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

app.use(
	'/api/graphql',
	bodyParser.json(),
	graphqlExpress({
		schema
	})
);

app.use(
	'/api/graphiql',
	graphiqlExpress({
		endpointURL: '/api/graphql'
	})
);

const start = function() {
	/* eslint-disable no-console */
	const server = app.listen(app.get('port'), () => {
		console.log(
			`Server listening on http://localhost:${server.address().port}`
		);
	});
	/* eslint-enable no-console */
};

export default start;
