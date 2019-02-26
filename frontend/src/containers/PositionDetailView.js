import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { Card } from 'antd';


class PositionDetail extends Component {

	// constructor(props) {
	// 	super(props);

	// 	this.state({})
	// }

	state = {
		position: {
			company: { name: '' },
			name: '',
			description: ''
		}
	};

	componentDidMount() {
		// this.getCompany(this.props.token);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.token === null && nextProps.token !== null) {
			this.getPosition(nextProps.token);
		}
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
		axios.delete(`http://127.0.0.1:8000/api/startups/${positionID}/`);
		// Kunne brukt denne, men den refresher ikke den '/' siden!
		// this.props.history.push('/');
		// Kunne også brukt denne
		// this.forceUpdate();
		// men det blir litt 'messy'

	}

	render() {
		return (
			<div> 
				<Card title={this.state.position.company.name} >
					<p>{this.state.position.name}</p>
					<p>{this.state.position.description}</p>
				</Card>
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