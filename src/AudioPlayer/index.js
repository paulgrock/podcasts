import React, { Component } from 'react';

class AudioPlayer extends Component {
	state = {
		playing: false
	}
	audioEl = React.createRef();

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps && nextProps.episode) {
			return {
				playing: true
			}
		}
		return prevState;
	}


	togglePlaying = () => {
		this.setState((prevState) => ({
			playing: !prevState.playing
		}));
	}

	componentDidMount() {
		if (this.audioEl.current) {
			let {current} = this.audioEl;
			this.state.playing ? current.play() : current.pause();
		}
	}


	componentDidUpdate() {
		if (this.audioEl.current) {
			let {current} = this.audioEl;
			this.state.playing ? current.play() : current.pause();
		}
	}

	render() {
		const {episode} = this.props;

		return episode ? (
			<div>
			<audio src={episode.episodeUrl} ref={this.audioEl} />
				<button onClick={this.togglePlaying}>
					{this.state.playing ? 'Pause': 'Play'}
				</button>
			}
			<input type="range" />
			{/* probably also want the podcast tuhmb */}
			</div>
		)
		: null
	}
}

export default AudioPlayer;
