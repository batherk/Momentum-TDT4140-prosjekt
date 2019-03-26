import React, { Component } from 'react';
import { connect } from 'react-redux'
// import axios from 'axios';
// import { Button, Card, List } from 'antd';

import PositionForm from '../components/PositionForm';

class PositionCreate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			companySlug: props.match.params.companySlug
		}
	}

	componentDidMount() {
		// const companySlug = this.props.match.params.companySlug;
	    console.log(this.state.companySlug);
	}

	redirect(data) {
		this.props.history.push(`/companys/${this.state.companySlug}/`);
	}
	// api/mycompanies/{slug}/positions
	render() {
		// console.log('render haloo');
		// const companySlug = this.props.match.params.companySlug;
		return (
			<div> 
				<h2>Create a position</h2>
				<PositionForm 
					requestType='post'
					authToken={this.props.token}
					companyURL={`http://127.0.0.1:8000/api/mycompanies/${this.state.companySlug}/positions/`}
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