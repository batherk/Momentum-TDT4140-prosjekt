import React from 'react';
import { Icon, Button, Spin, Card, Row, Col, Upload } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

// import * as actions from '../store/actions/auth';
import axios from "axios";

import Companys from '../components/Companys';

import Certified from './Certified';

import profilePlaceholder from '../assets/images/profile-placeholder.png';
import certifiedImage from '../assets/images/certified.png';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ProfilePage extends React.Component {

	state = {
		userdata: {},
		showMyCompanies: false,
		applications: [],
		isOwner: false,
		isApplicant: false,
	};



	componentWillReceiveProps(nextProps) {
		if (this.props.token === null && nextProps.token !== null) {
			this.getUserData(nextProps.token);
			// this.getOwnedCompanies(nextProps.token);
		}
	}

	componentDidMount() {
		if (this.props.token) {
			this.getUserData(this.props.token);
			// this.getOwnedCompanies(this.props.token);
		}
		// else {
		// 		this.getCompany();
		// }
	}

	getUserData(token) {
		// const header = (token === undefined) ? null : { headers: { 'Authorization' : 'Token ' + token }};

		const id = parseInt(localStorage.getItem('id'));
		axios.get(`http://127.0.0.1:8000/api/profile/${id}/`, {
			headers: { 'Authorization' : 'Token ' + token }
		})
			.then(res => {
				console.log('Data om brukeren: ', res);
				this.setState({
					userdata: res.data
				});
				if (res.data.role === 1) {
					this.getOwnedCompanies(token);
					this.setState({
						isOwner: true
					});
				} else if (res.data.role === 3) {
					this.setState({
						isApplicant: true
					});
				}
			})
			.catch(err => {
				console.error(err);
			});
	}

	getUserImage() {
		if (this.state.userdata.photo !== null) {
			return this.state.userdata.photo;
		}
		return '../assets/images/certified.png';
	}

	getOwnedCompanies(token) {
		axios.get('http://127.0.0.1:8000/api/mycompanies/', {
			headers: { Authorization : 'Token ' + token }
		})
		.then(res => {
			console.log('owned on profile', res.data);
			this.setState({
				applications: res.data
			});
		})
		.catch(err => console.error(err));
	}

	toggleMyCompanys() {
		this.setState({
			showMyCompanies: !this.state.showMyCompanies
		});
	}

	renderCreateCompany() {
		if (this.state.isOwner) {
			return (

					<Link to='/companyscreate/'>
						<Button type='primary' style={{ marginTop: '10px' }}>
							Create company
						</Button>
					</Link>
			);
		}
	}

	renderMyCompanys() {
		if (this.state.showMyCompanies && this.state.isOwner) {
			return (
				<Row>
					<br />
					<h2>My Companies</h2>
					<Companys data={this.state.applications} />
				</Row>
			);
		}	
	}

	renderMyCompanysButtons() {
		if (this.state.isOwner) {
			return (
				<Row>
					<Col>
						<Button onClick={(event) => this.toggleMyCompanys()}>
							Show my companys
						</Button>
					</Col>
				</Row>
			);
		}
	}

	renderApplicantData() {
		if (this.props.profile.role === 3) {
			return (
				<p>{`Education:  ${this.state.userdata.education}`}</p>
			);
		}
	}

	render() {
		const { photo } = this.state.userdata;
		const profileimg =  (photo !== null) ? photo : profilePlaceholder;
		return (
			<div>
				{
					this.props.loading ?
					<Spin indicator={antIcon} />

					:

					<div>

						<Card 
							type ="flex" 
							style={{ 
								"width": "100%", 
								alignItems: 'center'
							}}
						>
							<Row style={{ marginBottom: '20px' }}>
								<Col span={8}>
									<img alt="example" src={profileimg} style={{ width: '100%' }}/>
								</Col>
								<Col span={16} >
									<Card style={{ marginLeft: '20px' }}>
										<Row>
											<Col span={14}>
												<Row>
													<h3 style={{ alignSelf: 'center' }} >
														{`${this.state.userdata.first_name} ${this.state.userdata.last_name}`}
														<Certified certified={this.state.userdata.is_certified} />
													</h3>
													
												</Row>
												<p>
													{`Email:  ${this.state.userdata.email}`}
												</p>

													{this.renderApplicantData()}

											</Col>
											<Col span={10} style={{ float: 'right' }}>
												<Link to='/profile/edit/' >
													<Button type='primary'>Edit profile</Button>
												</Link>
												{ this.renderCreateCompany() }
											</Col>
										</Row>
									</Card>
								</Col>
							</Row>
							{ this.renderMyCompanysButtons() }
							{ this.renderMyCompanys() }
						</Card>
					</div>
				}
			</div>
		);
	}
}

/*
<Card
	hoverable
	style={{ width: '100%', minHeighth: '300px' }}
	cover={<img alt="example" src={profilePlaceholder} />}
/>
*/


const mapStateToProps = (state) => {
	console.log(state);
	return {
		token: state.token,
		id: state.id,
		profile: state.profile
	};
};

export default connect(mapStateToProps)(ProfilePage);