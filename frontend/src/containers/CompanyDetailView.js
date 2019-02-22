import React, { Component } from 'react';
import axios from 'axios';

import { Button, Card } from 'antd';

import CustomForm from '../components/Form';

class CompanyDetail extends Component {

	// constructor(props) {
	// 	super(props);

	// 	this.state({})
	// }

	state = {
		company: {}
	};

	componentDidMount() {
		const companyID = this.props.match.params.companyID;
		axios.get(`http://127.0.0.1:8000/api/startups/${companyID}/`) 
		.then(res => {
			this.setState({
				company: res.data
			});
		})
	}

	handleDelete = (event) => {
		const companyID = this.props.match.params.companyID;
		axios.delete(`http://127.0.0.1:8000/api/startups/${companyID}/`);
		// Kunne brukt denne, men den refresher ikke den '/' siden!
		// this.props.history.push('/');
		// Kunne også brukt denne
		// this.forceUpdate();
		// men det blir litt 'messy'

	}

	render() {
		return (
			<div> 
				<Card title={this.state.company.name} >
					<p>{this.state.company.info}</p>
					<p>{this.state.company.email}</p>
				</Card>
				<CustomForm 
					requestType='put'
					companyID={this.props.match.params.companyID}
					buttonText='Update'
				/>
				<form onSubmit={this.handleDelete}>
					<Button type='danger' htmlType='submit'>Delete</Button>
				</form>
			</div>
		);
	}
}

export default CompanyDetail;