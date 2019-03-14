import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import styles from '../styles/layout.css';
import logo from '../assets/images/momentum.png';
import axios from "axios";
import Searchbar from "../containers/Searchbar"

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

	state = {
		avatar: null
	};

	componentDidMount() {
		if (this.props.token) {
			this.getUserAvatar(this.props.token);
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if (this.props.token === null && nextProps.token !== null) {
			this.getUserAvatar(nextProps.token);
		}
	}


	getUserAvatar(token) {
		// const header = (token === undefined) ? null : { headers: { 'Authorization' : 'Token ' + token }};
		// console.log(this.props);
		//const id = this.props.id;
		const id = parseInt(localStorage.getItem('id'));
		axios.get(`http://127.0.0.1:8000/api/profile/${id}/`, {
			headers: { 'Authorization' : 'Token ' + token }
		})
			.then(res => {
				this.setState({
					avatar: res.data.photo
				});
				// console.log("TEEEEEEEST", res.data);
			})
			.catch(err => {
				console.error(err);
			});
	}

	renderPositions() {
		if (this.props.profile && this.props.profile.role === 3) {
			return (
				<Menu.Item key='3'>
					<Link to='/positions'>Positions</Link>
				</Menu.Item>
			);
		}
	}

	renderApplicants(){
		if (this.props.profile && this.props.profile.role === 1){
			return(
				<Menu.Item key='6'>
					<Link to='/applicants'>Applicants</Link>
				</Menu.Item>
			);

		}
	}

	renderLoginLogout() {
		if (this.props.isAuthenticated) {
			return (
				<Menu.Item key='2' onClick={this.props.logout} >
					<Link to='/'>Logout</Link>
				</Menu.Item>
			);
		}
		return (
			<Menu.Item key='2'>
				<Link to='/login'>Login</Link>
			</Menu.Item>
		);
	}

	renderProfilePage() {
		if (this.props.isAuthenticated) {
			return (
				<Menu.Item key='4'>
					<Link to='/profile' >
						<Avatar size={'default'} src={this.state.avatar} />
					</Link>
				</Menu.Item>
			);
		}

	}

	render () {
		return (
			<Layout className="layout">
				<Header>
					<div className="logo">
						<Link to='/'>
							<img height='100%' style={{ maxHeight: 50 }} src={logo} alt='' />
						</Link>
					</div>
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['2']}
						style={{ lineHeight: '64px' }}
					>
                        { this.renderProfilePage()}
						{ this.renderPositions() }
						{ this.renderApplicants()}
						{ this.renderLoginLogout() }


						<Menu.Item key='5' style={{"float":"right"}}>
							<Searchbar ></Searchbar>
						</Menu.Item>

					</Menu>


				</Header>
				<Content style={{ padding: '20px 20px' }}>
					<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
						{this.props.children}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Momentum ©2019
				</Footer>
			</Layout>
		);
	}
}
/*
Legg til når du skjønner det
<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
						<Breadcrumb.Item><Link to='/'>List</Link></Breadcrumb.Item>
					</Breadcrumb>
*/

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(actions.logout())
	};
};

const mapStateToProps = (state) => {
	return {
		token : state.token,
		profile: state.profile
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));