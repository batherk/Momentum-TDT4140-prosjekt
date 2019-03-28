import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Input } from 'antd';
import axios from 'axios';

import Companys from '../components/Companys';

const Search = Input.Search;
// import CompanyForm from '../components/CompanyForm';

class CompanyList extends Component {

	state = {
		applications: [],
		profile: {}
	};

	componentDidMount() {
		this.getCompanys();
	}

	getCompanys() {
		axios.get('http://127.0.0.1:8000/api/startups/')
		.then(res => this.setState({ applications: res.data }))
		.catch(err => console.error(err));
	}

	render() {
		return (
			<div>
				<Search
					placeholder="Søk på bedrifter"
					onSearch={value => {this.props.history.push(`/companys/search/${value}/`)}}
					style={{ width: 200 }}
				/>
				<Companys data={this.state.applications} />
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