import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';

class EpisodeList extends Component {
	audioEl = null
	state = {
		episodes: [],
		header: {},
		playing: false,
		trackId: false
	}
	componentDidMount() {
		const collectionId = this.props.history.location.state.id;
		fetch(`/api/lookup?id=${collectionId}`)
			.then(r => r.json())
			.then((searchResults) => {
				const header = searchResults.results[0]
				const results = searchResults.results.slice(1)
				console.log(header);
				this.setState({
					header,
					episodes: results
				})
			})
			.catch(e => console.error(e))
	}
	componentDidUpdate(oldProps, oldState) {
		if (this.state.trackId !== oldState.trackId) {
			this.setState({
				playing: true
			})
		}

	}
	togglePlay = (src, trackId) => {
		this.setState({
			src,
			playing: !this.state.playing,
			trackId
		})
	}
	formatTime(timeInMS) {
		const minutes = Math.floor(timeInMS / 60000);
		const seconds = ((timeInMS % 60000) / 1000).toFixed(0);
		return (seconds === 60 ? ( minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
	}
	render() {
		return (
			<div>
				<header>
					<h1>{this.state.header.collectionName}</h1>
					<img src={this.state.header.artworkUrl100} alt={this.state.header.collectionName}/>
					<p>Latest release: {this.state.header.releaseDate}</p>
				</header>
				<ol>
					{this.state.episodes.map((episode) => (
						<li key={episode.trackId}>
							<h2>{episode.trackName}</h2>
							<button onClick={() => this.togglePlay(episode.episodeUrl, episode.trackId)}>{
								this.state.trackId === episode.trackId &&
								this.state.playing ? 'Pause' : 'Play'
							}</button>
							<p>Released: {episode.releaseDate}</p>
							<time>Minutes: {this.formatTime(episode.trackTimeMillis)}</time>
							<p>Description: {episode.description}</p>
						</li>
					))}
				</ol>
				<AudioPlayer src={this.state.src} playing={this.state.playing} />
			</div>
		)
	}
}

export default EpisodeList;
