import React, { Component } from 'react';
import './App.css';
import Search from './Search';
import EpisodeList from './EpisodeList';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
				<Route path="/" exact component={Search} />
				<Route path="/podcasts/:id" component={EpisodeList} />
      </div>
    );
  }
}

export default App;
