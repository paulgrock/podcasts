import React, { Component } from 'react';
import './index.css';
import Home from '../Home';
import EpisodeList from '../EpisodeList';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

class App extends Component {
	state = {
		episode: null
	};

	previousLocation = this.props.location;

	componentWillUpdate(nextProps) {
		const { location } = this.props;
		// set previousLocation if props.location is not modal
		if (
			nextProps.history.action !== 'POP' &&
			(!location.state || !location.state.modal)
		) {
			this.previousLocation = this.props.location;
		}
	}

	handlePlay = episode => {
		this.setState({
			episode
		});
	};

	render() {
		const { location } = this.props;
		const isModal = !!(
			location.state &&
			location.state.modal &&
			this.previousLocation !== location
		); // not initial render
		return (
			<div className="App">
				<Header />
				<Switch location={isModal ? this.previousLocation : location}>
					<Route path="/" exact component={Home} />
					<Route
						path="/podcasts/:id"
						render={props => (
							<EpisodeList handlePlay={this.handlePlay} {...props} />
						)}
					/>
				</Switch>
				{this.state.episode && (
					<footer>
						<Footer episode={this.state.episode} />
					</footer>
				)}
			</div>
		);
	}
}

export default App;
