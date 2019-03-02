import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { Button, Card } from 'antd';

import CustomForm from '../components/Form';

class CompanyEdit extends Component {

	render() {
		return (
			
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.token
	};
};

export default connect(mapStateToProps)(CompanyEdit);