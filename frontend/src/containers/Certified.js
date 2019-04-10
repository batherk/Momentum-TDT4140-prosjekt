import React from 'react';
import certifiedImage from '../assets/images/certified.png';

const Certified = ({ certified }) => {
	if (certified) {
		return (
			<img 
				alt='certified' 
				src={certifiedImage}
				style={{ height: '30px', width: '30px', padding: 5 }}
			/>
		);
	}
	return null;
}

export default Certified;