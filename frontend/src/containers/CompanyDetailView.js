import React, { Component } from 'react';
import { connect } from 'react-redux'
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
		if (this.props.token) {
			this.getCompany(this.props.token);
		} // else {
		// 		this.getCompany();
		// }
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.token === null && nextProps.token !== null) {
			this.getCompany(nextProps.token);
		}
	}

	getCompany(token) {
		const companyID = this.props.match.params.companyID;
		// const header = (token === undefined) ? null : { headers: { 'Authorization' : 'Token ' + token }};
		axios.get(`http://127.0.0.1:8000/api/startups/${companyID}/`, {
			headers: { 'Authorization' : 'Token ' + token }
		})
		.then(res => {
			console.log('Data om bedriften: ', res);
			this.setState({
				company: res.data
			});
		})
		.catch(err => {
			console.error(err);
		});
	}

	// getCompany() {
	// 	const companyID = this.props.match.params.companyID;
	// 	axios.get(`http://127.0.0.1:8000/api/startups/${companyID}/`)
	// 	.then(res => {
	// 		console.log('Data om bedriften: ', res);
	// 		this.setState({
	// 			company: res.data
	// 		});
	// 	})
	// 	.catch(err => {
	// 		console.error(err);
	// 	});
	// }

	handleDelete(event) {
		const companyID = this.props.match.params.companyID;
		axios.delete(`http://127.0.0.1:8000/api/startups/${companyID}/`);
		// kan bruke noe .then, og se om det er sukksess, og så gjøre noe

		// Kunne brukt denne, men den refresher ikke den '/' siden!
		// this.props.history.push('/');
		// Kunne også brukt denne
		// this.forceUpdate();
		// men det blir litt 'messy'
	}

	renderUpdateDeleteForm() {

	}

	render() {
		return (
			<div> 
				<Card title={this.state.company.name} >
					<p>{this.state.company.info}</p>
					<p>{this.state.company.email}</p>
				</Card>
				{
					(this.props.token)  ? 
					<div>
						<CustomForm 
							requestType='put'
							companyID={this.props.match.params.companyID}
							buttonText='Update'
						/>
						<form onSubmit={this.handleDelete}>
							<Button type='danger' htmlType='submit'>Delete</Button>
						</form>
					</div>
					:

					null
					
				}	
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.token
	};
};

export default connect(mapStateToProps)(CompanyDetail);