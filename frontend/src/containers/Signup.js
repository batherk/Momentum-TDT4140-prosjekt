import React from 'react';
import { Form, Input, Icon, Button, Radio } from 'antd';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';

// const RadioGroup = Radio.Group;

class RegistrationForm extends React.Component {
	state = {
		confirmDirty: false,
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.onAuth(
					values.firstName,
					values.lastName,
					values.email,
					values.password,
					values.role
				);
				this.props.history.push('/');
			}
		});
	}

	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
			// callback();
		} else {
			callback();
		}
	}

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSubmit}>
				<h1>Signup</h1>
				<br/>
				<h3>Name</h3>
				<Form.Item>
					{getFieldDecorator('firstName', {
						rules: [{ required: true, message: 'Please input your first name!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First name" />
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('lastName', {
						rules: [{ required: true, message: 'Please input your last name!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last name" />
					)}
				</Form.Item>

				<h3>Email</h3>
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

				<h3>Password</h3>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{
							required: true, message: 'Please input your password!',
						}, {
							validator: this.validateToNextPassword,
						}],
					})(
						<Input 
							type="password" 
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
							placeholder="Password"/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('confirm', {
						rules: [{
							required: true, message: 'Please confirm your password!',
						}, {
							validator: this.compareToFirstPassword,
						}],
					})(
						<Input 
							type="password" 
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
							placeholder="Confirm password" 
							onBlur={this.handleConfirmBlur} />
					)}
				</Form.Item>

				<h3>I am an: </h3>
				<Form.Item
				>
					{getFieldDecorator('role', { initialValue: 3 })(
					<Radio.Group>
						{/* 
							Litt userr, men value er primary keyen til rollene i databasen
							burde hentes inn fra databasen ellerno, men dette funker nå
						 */}
						<Radio.Button value={3}>Applicant</Radio.Button>
						<Radio.Button value={1}>Business Owner</Radio.Button>
						<Radio.Button value={2}>Investor</Radio.Button>
					</Radio.Group>
				)}
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit' style={{ marginRight: '10px' }}>
						Signup
					</Button>
					Or
					<NavLink 
						style={{ marginRight: '10px' }} 
						to='/login/'> login
					</NavLink>
				</Form.Item>
			</Form>
		);
	}
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.error
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (firstName, lastName, email, password, role) => {
			dispatch(actions.authSignup(firstName, lastName, email, password, role))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);
