import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {Button, Card, List, Tag} from 'antd';

import CompanyForm from '../components/CompanyForm';
import TagSelection from "./TagSelection";
// import Positions from '../components/Positions';

class CompanyDetail extends Component {

	state = {
		company: {
			positions: null
		},
		profile: null,
		isApplicant: false,
		isOwner: false,
		showForm: false
	};

	componentDidMount() {
		if (this.props.token && this.props.id !== 2) { 
			// id 2 er investor, hotfix for at de skal få se firma
			this.getCompany(this.props.token, this.props.id);
		} else {
			this.getOnlyTheCompany();
		}
		// if (this.props.profile) {
		// 	// this.getProfile(nextProps.token, nextProps.id);
		// 	if (this.props.profile.role === 1) {
		// 		this.getOwnedCompanies(this.props.token);
		// 	} else if (this.props.profile.role === 3) {
		// 		this.setState({
		// 			isApplicant: true
		// 		});
		// 	}
		// }
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.token === null && nextProps.token !== null) {
			this.getCompany(nextProps.token, nextProps.id);
		}
		// if (this.props.profile === null && nextProps.profile !== null ) {
		// 	// this.getProfile(nextProps.token, nextProps.id);
		// 	if (nextProps.profile.role === 1) {
		// 		this.getOwnedCompanies(nextProps.token);
		// 	} else if (nextProps.profile.role === 3) {
		// 		this.setState({
		// 			isApplicant: true
		// 		});
		// 	}
		// }
	}

	getCompany(token, id) {
		const companySlug = this.props.match.params.companySlug;
		// console.log(companySlug);
		axios.get(`http://127.0.0.1:8000/api/startups/${companySlug}/`, {
			headers: { Authorization : 'Token ' + token }
		})
		.then(res => {
			console.log('company', res);
			this.setState({ company: res.data });
			this.getProfile(token, id);
		})
		.catch(err => {
			console.error(err);
			this.props.history.push('/');
		});
	}

	getOnlyTheCompany() {
		const companySlug = this.props.match.params.companySlug;
		// console.log(companySlug);
		axios.get(`http://127.0.0.1:8000/api/startups/${companySlug}/`)
		.then(res => {
			console.log('company', res);
			this.setState({ company: res.data });
			// this.getProfile(token, id);
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
			} else if (res.data.role === 3) {
				this.setState({
					isApplicant: true
				});
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
					console.log('is owner!!');
					this.setState({
						isOwner: true
					});
				}
			}
		})
		.catch(err => console.error(err));
	}


	toggleEdit(event) {
		this.setState({
			showForm: !this.state.showForm
		});
	}

	handleDelete(event) {
		// event.preventDefault();
		console.log('handle delete', this.props);
		const companySlug = this.props.match.params.companySlug;
		axios.delete(`http://127.0.0.1:8000/api/startups/${companySlug}/`, {
			headers: { 'Authorization' : 'Token ' + this.props.token }
		})
		.then(res => console.log('delete succsess', res))
		.catch(err => console.error(err));
		// kan bruke noe .then, og se om det er sukksess, og så gjøre noe

		// Kunne brukt denne, men den refresher ikke den '/' siden!
		this.props.history.push('/');
		// this.props.history.pop();
		// Kunne også brukt denne
		// this.forceUpdate();
		// men det blir litt 'messy'
	}

	updateCompany(data) {
		this.props.history.push(`/companys/${data.slug}/`);
		this.setState({
			company: data
		});
		this.toggleEdit(null);
	}

	renderEditButton() {
		if (this.state.isOwner) {
			return (
				<Button onClick={(event) => this.toggleEdit()} style={{ marginTop: '10px' }}>
					Edit
				</Button>
			);
		}
	}

	renderUpdateDeleteForm() {
		if (this.state.isOwner && this.state.showForm) {
			return (
				<div>
					<CompanyForm 
						requestType='patch'
						authToken={this.props.token}
						companyURL={this.state.company.url}
						tags={this.state.company.tags}
						onSuccess={this.updateCompany.bind(this)}
						buttonText='Update'
					/>
					<Button type='danger' onClick={this.handleDelete.bind(this)}>Delete</Button>
				</div>
			);
		}
	}

	renderTags(){
		let tags = this.state.company.tags;
		if(tags == null)
			return;
		if(tags.length !== 0){
			return (
				<div>
				<List
					  size="large"
					  dataSource={tags}
					  renderItem={item => ( <Tag key={item.id} color={TagSelection.getColorPreset(item.color)}  >
							  {item.name} ({item.times_used})
						  </Tag>

					  )}/>
				</div>

			)
		}
	}

	renderPositions() {
		if (this.state.isApplicant && this.state.company.positions !== null) {
			return (
				<div>
					<br />
					<h2>Positions</h2>
					<List
						itemLayout='vertical'
						size='large'
						// pagination={{
						// 	onChange: (page) => {
						// 		console.log(page);
						// 	},
						// 	pageSize: 3
						// }}
						dataSource={this.state.company.positions}
						renderItem={item => (
							<List.Item
								key={item.id}
							>
								<List.Item.Meta
									title={<a href={`/positions/${item.id}/`}>{item.name}</a>}
									description={item.description}
								/>
							</List.Item>
						)}
					/>
				</div>
			);
		}
	}

/*

if (this.state.company.positions !== null) {
				return (
					<List
						itemLayout="vertical"
						size="large"
						pagination={{
							onChange: (page) => {
								console.log(page);
							},
							pageSize: 3,
						}}
						dataSource={this.props.company.positions}
						// footer={<div><b>ant design</b> footer part</div>}
						renderItem={item => (
							<List.Item
								key={item.title}
								// actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
								// extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
							>
								<List.Item.Meta
									// avatar={<Avatar src={item.avatar} />}
									title={<a href={`/positions/${item.id}`}>{`${item.name}`}</a>}
									description={item.description}
								/>
								
							</List.Item>
						)}
					/>
				);
			}
			

*/

/*`${item.company.name}: ${item.content}`*/

	render() {
		return (
			<div> 
				<Card title={this.state.company.name} >
					<p>{this.state.company.info}</p>
					<p>{this.state.company.email}</p>
					{this.renderTags()}
				</Card>

				{ this.renderPositions() }

				{ this.renderEditButton() }
				{ this.renderUpdateDeleteForm() }

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
		id: state.id,
		profile: state.profile
	};
};

export default connect(mapStateToProps)(CompanyDetail);