import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import format from 'date-fns/format';

let episodeListSearch = gql`
	query podcastQuery($id: ID!) {
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
				episodeUrl
				artworkUrl60
				trackViewUrl
			}
		}
	}
`;
class EpisodeList extends Component {
	formatTime(timeInMS) {
		const minutes = Math.floor(timeInMS / 60000);
		const seconds = ((timeInMS % 60000) / 1000).toFixed(0);
		return seconds === 60
			? minutes + 1 + ':00'
			: minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	}

	formatDate(releaseDate) {
		return format(releaseDate, 'MM/DD/YY');
	}
	render() {
		const { handlePlay, location } = this.props;
		return (
			<Query query={episodeListSearch} variables={{ id: location.state.id }}>
				{({ error, loading, data }) => {
					if (loading || error) {
						return <div />;
					}
					const { podcast } = data;
					return (
						<div>
							{podcast && podcast.header ? (
								<header>
									<h1>{podcast.header.collectionName}</h1>
									<img
										src={podcast.header.artworkUrl100}
										alt={podcast.header.collectionName}
									/>
									<p>
										Latest release:{' '}
										{this.formatDate(podcast.header.releaseDate)}
									</p>
								</header>
							) : null}
							<ol>
								{podcast &&
									podcast.episodes &&
									podcast.episodes.map(episode => (
										<li key={episode.trackId}>
											<h2>{episode.trackName}</h2>
											<button onClick={() => handlePlay(episode)}>Play</button>
											<p>Released: {this.formatDate(episode.releaseDate)}</p>
											<time>
												Length: {this.formatTime(episode.trackTimeMillis)}
											</time>
											{/* TODO: probably want to trim this */}
											<p>Description: {episode.description}</p>
										</li>
									))}
							</ol>
						</div>
					);
				}}
			</Query>
		);
	}
}

export default EpisodeList;
