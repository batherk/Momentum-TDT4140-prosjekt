import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

import Companys from '../components/Companys';
import CustomForm from '../components/Form';

// const listData = [];
// for (let i = 0; i < 23; i++) {
// 	listData.push({
// 		href: 'http://ant.design',
// 		title: `ant design part ${i}`,
// 		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
// 		description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
// 		content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// 	});
// }

class CompanyList extends Component {

	// constructor(props) {
	// 	super(props);

	// 	this.state({})
	// }

	state = {
		companys: []
	};

	componentDidMount() {
	    axios.get('http://127.0.0.1:8000/api/startups/')
	    .then(res => {
	    	this.setState({
	    		companys: res.data
	    	});
	    	console.log(res.data);
	    })
	}

	componentWillReceiveProps(nextProps) {
	    if (this.props.token === null && nextProps.token !== null) {
			// this.getCompany(nextProps.token);
			axios.get('http://localhost:8000/api/positions/', {
				headers: {
					Authorization : 'Token ' + nextProps.token
				}
			})

			// axios({
			// 	method: 'get',
			// 	url: 'http://localhost:8000/api/positions/',
			// 	headers: { Authorization : 'Token ' + nextProps.token }
			// })
			.then(res => {
				console.log('positions', res);
			})
			.catch(err => {
				console.error(err);
			});


		}
	}

	render() {
		return (
			<div>
				<Companys data={this.state.companys} />
				<br />
				<h2>Create a company</h2>
				<CustomForm 
					requestType='post'
					companyID={null}
					buttonText='Create'
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('This state: ', state);
	return {
		token: state.token
	};
};

export default connect(mapStateToProps)(CompanyList);