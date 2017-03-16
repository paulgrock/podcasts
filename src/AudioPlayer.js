import React, { Component } from 'react';

class AudioPlayer extends Component {
	audioEl
	shouldComponentUpdate(nextProps) {
		if (this.props.src === nextProps.src) {
			return false;
		}
		return true;
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.src === nextProps.src) {
			nextProps.playing ?
				this.audioEl.play() :
				this.audioEl.pause();
		}
	}
	render() {
		return (
			<audio src={this.props.src} ref={(el) => this.audioEl = el} autoPlay/>
		)
	}
}

export default AudioPlayer;
