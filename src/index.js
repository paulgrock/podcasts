import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
	uri: '/api/graphql'
});


ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<Route component={App} />
		</Router>
	</ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
