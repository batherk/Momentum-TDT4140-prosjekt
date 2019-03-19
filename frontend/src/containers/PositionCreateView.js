import React, { Component } from 'react';
import { connect } from 'react-redux'
// import axios from 'axios';
// import { Button, Card, List } from 'antd';

import PositionForm from '../components/PositionForm';

class PositionCreate extends Component {

	redirect(data) {
		this.props.history.push(`/profile`);
	}

	render() {
		console.log('render haloo');
		return (
			<div> 
				<h2>Create a position</h2>
				<PositionForm 
					requestType='post'
					authToken={this.props.token}
					companyURL={'http://127.0.0.1:8000/api/mycompanies/'}
					onSuccess={this.redirect.bind(this)}
					buttonText='Create'
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
		id: state.id
	};
};

export default connect(mapStateToProps)(PositionCreate);