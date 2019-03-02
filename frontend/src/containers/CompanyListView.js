import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

import Companys from '../components/Companys';
// import CompanyForm from '../components/CompanyForm';

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

	state = {
		companys: [],
		profile: {}
	};

	componentDidMount() {
		this.getCompanys();
	}

	// componentWillReceiveProps(nextProps) {
	//  //    if (this.props.token === null && nextProps.token !== null) {
	//  //		this.getProfile(nextProps.token, nextProps.id);
	// 	// }
	// }

	getCompanys() {
		axios.get('http://127.0.0.1:8000/api/startups/')
		.then(res => this.setState({ companys: res.data }))
		.catch(err => console.error(err));
	}

	render() {
		return (
			<div>
				<Companys data={this.state.companys} />
			</div>
		);
	}
}

/*

Skal brukes inn på en BO sin profilside, der han kan velge å lage en ny profil

				<br />
				<h2>Create a company</h2>
				<CompanyForm 
					requestType='post'
					companyID={null}
					buttonText='Create'
				/>

*/

const mapStateToProps = (state) => {
	console.log('This state: ', state);
	return {
		token: state.token,
		id: state.id
	};
};

export default connect(mapStateToProps)(CompanyList);