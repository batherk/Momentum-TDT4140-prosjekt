import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { Card, Button } from 'antd';

import PositionForm from '../components/PositionForm';


class PositionDetail extends Component {

	// constructor(props) {
	// 	super(props);

	// 	this.state({})
	// }

	constructor(props) {
		super(props);

		this.state = {
			position: {
				company: { name: '' },
				name: '',
				description: '',
				is_owner: false
			},
			showForm: false,
			// companySlug: props.match.params.companySlug
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.token === null && nextProps.token !== null) {
			this.getPosition(nextProps.token);
		}
	}

	redirect() {
		this.props.history.goBack();
	}

	getPosition = (token) => {
		const positionID = this.props.match.params.positionID;
		axios.get(`http://127.0.0.1:8000/api/positions/${positionID}/`, {
			headers: { 'Authorization' : 'Token ' + token }
		}) 
		.then(res => {
			console.log('Data om posisjonen: ', res);
			this.setState({
				position: res.data
			});
		});
	}

	handleDelete = (event) => {
		const positionID = this.props.match.params.positionID;
		axios.delete(`http://127.0.0.1:8000/api/positions/${positionID}/`, {
			headers: { 'Authorization' : 'Token ' + this.props.token }
		})
		.then(this.redirect());
		// Kunne brukt denne, men den refresher ikke den '/' siden!
		// this.props.history.push('/');
		// Kunne også brukt denne
		this.forceUpdate();
		// men det blir litt 'messy'

	}

	toggleEdit(event) {
		this.setState({
			showForm: !this.state.showForm
		});
	}

	renderEditButton() {
		if (this.state.position.is_owner) {
			return (
				<Button onClick={(event) => this.toggleEdit()} style={{ marginTop: '10px' }}>
					Edit
				</Button>
			);
		}
	}

	renderUpdateDeleteForm() {
		if (this.state.position.is_owner && this.state.showForm) {
			// const slug = this.state.position.company.slug;
			const positionID = this.props.match.params.positionID;
			return (
				<div>
					<PositionForm
						requestType='put'
						authToken={this.props.token}
						companyURL={`http://127.0.0.1:8000/api/positions/${positionID}/`}
						onSuccess={this.redirect.bind(this)}
						buttonText='Update'
					/>
					<Button type='danger' onClick={this.handleDelete.bind(this)}>Delete</Button>
				</div>
			);
		}
	}


	render() {
		return (
			<div> 
				<Card title={this.state.position.company.name} >
					<p>{this.state.position.name}</p>
					<p>{this.state.position.description}</p>
				</Card>
				{ this.renderEditButton() }
				{ this.renderUpdateDeleteForm() }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.token
	};
};

export default connect(mapStateToProps)(PositionDetail);