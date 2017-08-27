import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';
import { gql, graphql } from 'react-apollo';


let lookupQuery = gql`
	query podcastQuery($id: Int!) {
		podcast(id: $id) {
			header {
				collectionName
				artworkUrl100
				releaseDate
			}
			episodes {
				trackId
				trackName
				description
				releaseDate
				episodeUrl
				trackTimeMillis
			}
		}
	}
`
class EpisodeList extends Component {
	state = {
		playing: false,
		trackId: false
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
		const { data: { error, loading, podcast}} = this.props;
		return (
			<div>
				{podcast && podcast.header ?
					<header>
						<h1>{podcast.header.collectionName}</h1>
						<img src={podcast.header.artworkUrl100} alt={podcast.header.collectionName}/>
						<p>Latest release: {podcast.header.releaseDate}</p>
					</header>
					: null
				}
				<ol>
					{podcast && podcast.episodes && podcast.episodes.map((episode) => (
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

export default graphql(lookupQuery, {
	options: (props) => ({
		variables: {
			id: props.history.location.state.id
		}
	})
})(EpisodeList);
