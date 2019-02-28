import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import styles from '../styles/layout.css';
import logo from '../assets/images/momentum.png';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

	renderPositions() {
		if (this.props.isAuthenticated) {
			return (
				<Menu.Item key='3'>
					<Link to='/positions'>Positions</Link>
				</Menu.Item>
			);
		}
		return null;
	}

	renderLoginLogout() {
		if (this.props.isAuthenticated) {
			return (
				<Menu.Item key='2' onClick={this.props.logout} >
					Logout
				</Menu.Item>
			);
		}
		return (
			<Menu.Item key='2'>
				<Link to='/login' >Login</Link>
			</Menu.Item>
		);
	}

	renderProfilePage() {
		if (this.props.isAuthenticated) {
			return (
				<Menu.Item key='4'>
					<Link to='/profile' >Profile</Link>
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
						{ this.renderPositions() }
						{ this.renderLoginLogout() }
						{ this.renderProfilePage()}
					</Menu>
				</Header>
				<Content style={{ padding: '20px 20px' }}>
					<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
						{this.props.children}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2018 Created by Ant UED
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

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));