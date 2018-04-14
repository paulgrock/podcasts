import React from 'react';
import AudioPlayer from '../AudioPlayer';
import './index.css';

const Footer = props => {
	return (
		<footer>
			<AudioPlayer {...props} />
		</footer>
	);
};

export default Footer;
