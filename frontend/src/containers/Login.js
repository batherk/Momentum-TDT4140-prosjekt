import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

import * as actions from '../store/actions/auth';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends React.Component {


	componentWillReceiveProps(nextProps) {
	    if (this.props.token !== nextProps.token && nextProps.error === null) {
	    	this.props.history.push('/');
	    }
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.onAuth(values.email, values.password);
			}
		});
	}

	render() {
		let errorMessage = null;
		if (this.props.error) {
			errorMessage = (
				<p>{this.props.error.message}</p>
			);
		}

		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				{ errorMessage }

				{

					this.props.loading ? 

					<Spin indicator={antIcon} />

					:

					<Form onSubmit={this.handleSubmit} className="login-form">
						<h1>Login</h1>
						<br/>	
						<Form.Item>
							{getFieldDecorator('email', {
								rules: [{
									type: 'email', message: 'The input is not valid E-mail!',
								}, {
									required: true, message: 'Please input your E-mail!',
								}],
							})(
								<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: 'Please input your Password!' }],
							})(
								<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
							)}
						</Form.Item>
						<Form.Item>
							<Button type='primary' htmlType='submit' style={{ marginRight: '10px' }}>
								Login
							</Button>
							Or
							<NavLink 
								style={{ marginRight: '10px' }} 
								to='/signup/'> signup
							</NavLink>
						</Form.Item>
					</Form>
				}
			</div>
		);
	}
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.error,
		token: state.token
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password) => dispatch(actions.authLogin(email, password))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);