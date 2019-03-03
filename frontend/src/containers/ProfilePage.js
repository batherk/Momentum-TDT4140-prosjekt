import React from 'react';
import { Icon, Button, Spin, Card, Row, Col } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

// import * as actions from '../store/actions/auth';
import axios from "axios";

import Companys from '../components/Companys';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const { Meta } = Card;

class ProfilePage extends React.Component {

	state = {
		userdata: {},
		showMyCompanies: false,
		companys: [],
		isOwner: false,
		isApplicant: false
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

	getOwnedCompanies(token) {
		axios.get('http://127.0.0.1:8000/api/mycompanies/', {
			headers: { Authorization : 'Token ' + token }
		})
		.then(res => {
			console.log('owned on profile', res.data);
			this.setState({
				companys: res.data
			});
		})
		.catch(err => console.error(err));
	}

	toggleMyCompanys() {
		this.setState({
			showMyCompanies: !this.state.showMyCompanies
		});
	}

	renderMyCompanys() {
		if (this.state.showMyCompanies && this.state.isOwner) {
			return (
				<Row>
					<Companys data={this.state.companys} />
				</Row>
			);
		}	
	}

	renderMyCompanysButtons() {
		if (this.state.isOwner) {
			return (
				<div>
					<Col>
						<Button onClick={(event) => this.toggleMyCompanys()} >Show my companys</Button>
					</Col>
					<Col>
						<Button type='primary'><Link to='/companys/create/'>Create a new company</Link></Button>
					</Col>
				</div>
			);
		}
	}

	render() {
		return (

			<div>
				{
					this.props.loading ?
					<Spin indicator={antIcon} />
					:

					<div>

						<Card type ="flex" style={{ "width": "100%", margin:0,alignItems: 'center'}}>

							<Row>
								<Col span={12}>
									<Card
										hoverable
										style={{ width: 300}}
										cover={<img alt="example" src={this.state.userdata.photo}/>}
									>
										<Meta
											title={`${this.state.userdata.first_name} ${this.state.userdata.last_name}`}
											description=""
										/>
									</Card>
								</Col>
								<Col span={12}>
									Card content  {this.state.userdata.email}
								</Col>
							</Row>
							<Row type ="flex" justify="space-between" style={{ marginTop: '20px' }}>
								
								<Col>
									<Button type='primary'><Link to='/profile/edit/' >Edit profile</Link></Button>
								</Col>
								{ this.renderMyCompanysButtons() }
							</Row>
							{ this.renderMyCompanys() }
						</Card>
					</div>
				}
			</div>
		);
	}
}



const mapStateToProps = (state) => {
	console.log(state);
	return {
		token: state.token,
		id: state.id
	};
};

export default connect(mapStateToProps)(ProfilePage);