import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
const networkInterface = createNetworkInterface({
	uri: '/api/graphql'
});
const client = new ApolloClient({
	networkInterface: networkInterface
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<Route component={App} />
		</Router>
	</ApolloProvider>,
  document.getElementById('root')
);
