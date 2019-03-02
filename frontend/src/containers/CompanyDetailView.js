import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { Button, Card } from 'antd';

import CompanyForm from '../components/CompanyForm';

class CompanyDetail extends Component {

	// constructor(props) {
	// 	super(props);

	// 	this.state({})
	// }

	state = {
		company: {},
		profile: null,
		isOwner: false
	};

	componentDidMount() {
		this.getCompany();
		// if (this.props.token) {
		// 	this.getCompany(this.props.token);
		// } // else {
		// 		this.getCompany();
		// }
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.token === null && nextProps.token !== null) {
			this.getProfile(nextProps.token, nextProps.id);
		}
	}

	// getCompany(token) {
	// 	const companySlug = this.props.match.params.companySlug;
	// 	// const header = (token === undefined) ? null : { headers: { 'Authorization' : 'Token ' + token }};
	// 	axios.get(`http://127.0.0.1:8000/api/startups/${companySlug}/`, {
	// 		headers: { 'Authorization' : 'Token ' + token }
	// 	})
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

	getCompany() {
		const companySlug = this.props.match.params.companySlug;
		console.log(companySlug);
		axios.get(`http://127.0.0.1:8000/api/startups/${companySlug}/`)
		.then(res => {
			console.log('company', res);
			this.setState({ company: res.data });
		})
		.catch(err => {
			console.error(err);
			this.props.history.push('/');
		});
	}


	getProfile(token, id) {
		axios.get(`http://localhost:8000/api/profile/${id}/`, {
			headers: { Authorization : 'Token ' + token }
		})
		.then(res => {
			console.log('profile', res);
			this.setState({ profile: res.data });

			// Litt ghetto siden 1 er bare en id til BO i databasen, men fuker til demo
			if (res.data.role === 1) {
				this.getOwnedCompanies(token);
			}
		})
		.catch(err => console.error(err));
	}

	getOwnedCompanies(token) {
		axios.get('http://127.0.0.1:8000/api/mycompanies/', {
			headers: { Authorization : 'Token ' + token }
		})
		.then(res => {
			console.log('My companies', res);
			for (let i = 0; i < res.data.length; i++) {
				if (res.data[i].id === this.state.company.id) {
					this.setState({
						isOwner: true
					});
				}
			}
		})
		.catch(err => console.error(err));
	}

	handleDelete(event) {
		const companyID = this.props.match.params.companyID;
		axios.delete(`http://127.0.0.1:8000/api/startups/${companyID}/`);
		// kan bruke noe .then, og se om det er sukksess, og så gjøre noe

		// Kunne brukt denne, men den refresher ikke den '/' siden!
		// this.props.history.push('/');
		// Kunne også brukt denne
		this.forceUpdate();
		// men det blir litt 'messy'
	}

	renderUpdateDeleteForm() {
		if (this.state.isOwner) {
			return (
				<div>
					<CompanyForm 
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
		return null;
	}

	render() {
		return (
			<div> 
				<Card title={this.state.company.name} >
					<p>{this.state.company.info}</p>
					<p>{this.state.company.email}</p>
				</Card>
				{ this.renderUpdateDeleteForm() }	
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

export default connect(mapStateToProps)(CompanyDetail);