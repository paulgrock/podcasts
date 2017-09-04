import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import EpisodeList from './EpisodeList';
import {
	Route,
	Switch
} from 'react-router-dom';
import Header from './Header.js';
import LoginSignupModal from './Login.js'
import LoginPage from './Login.js'

class App extends Component {

	previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }
  render() {
		const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    )
    return (
      <div className="App">
				{isModal ? <Route path="/:login(signup|login)" component={LoginSignupModal} /> : null}
				<Header />
				<Switch location={isModal ? this.previousLocation : location}>
					<Route path="/" exact component={Home} />
					<Route path="/podcasts/:id" component={EpisodeList} />
					<Route path="/:login(signup|login)" component={LoginPage} />
				</Switch>
      </div>
    );
  }
}

export default App;
