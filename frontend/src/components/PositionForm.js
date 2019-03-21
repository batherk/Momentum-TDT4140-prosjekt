import React from 'react';
import {
	Form, Input, Button, Icon
} from 'antd';

import axios from 'axios';


class PositionForm extends React.Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		formLayout: 'horizontal',
	// 	};
	// }

	// handleFormLayoutChange = (e) => {
	// 	this.setState({ formLayout: e.target.value });
	// }

	// handleFormSubmit = (event, requestType, companyURL) => { // requestType is 'post' og 'put'
	handleFormSubmit(event) {
		event.preventDefault();

		console.log('props: ', this.props);

		const { requestType, companyURL } = this.props;

		// Value er '' (tom streng) hvis du ikke putter noe i inputet
		// const name = event.target.elements.name.value;
		// const email = event.target.elements.email.value;
		// const info = event.target.elements.info.value;

		// // console.log(name, email, info);
		// // const data = {  };
		// let data = {};
		// if (name !== '') data['name'] = name;
		// if (email !== '') data['email'] = email;
		// if (info !== '') data['info'] = info;

		// console.log(data);

		console.log(this.props.form.getFieldsValue());

		switch (requestType) {
			case 'post':
				axios.post(companyURL, this.props.form.getFieldsValue(), {
					headers: { Authorization : 'Token ' + this.props.authToken }
				})
				.then((res) => { 
					console.log(res);
					this.props.onSuccess(res.data);
				})
				.catch((err) => console.error(err));
				break;
			case 'patch':
				axios.patch(companyURL, this.props.form.getFieldsValue(), {
					headers: { Authorization : 'Token ' + this.props.authToken }
				})
				.then((res) => { 
					console.log(res); 
					this.props.onSuccess(res.data);
				})
				.catch((err) => {
					console.log('We got an error');
					console.error(err);
				});
				break;
			default:
				console.log('what');
		}
	}

	/*(event) => 
					this.handleFormSubmit(
						event, 
						this.props.requestType,
						this.props.companyURL 
					)} */

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Form onSubmit={this.handleFormSubmit.bind(this)}>
					<Form.Item
						label="Name"
					>	
						{getFieldDecorator('name', {
							rules: [{ required: true, message: 'Please input the company name!' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="name" placeholder="Name" />
						)}
						
					</Form.Item>
					<Form.Item
						label="Email"
					>
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
					<Form.Item
						label="Info"
					>
						{getFieldDecorator('info', {
							rules: [{ required: true, message: 'Please input some info!' }],
						})(
							<Input prefix={<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} type="name" placeholder="Info" />
						)}
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">{this.props.buttonText}</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

// <Input name="email" placeholder="Put your email here" />
// <Input name="name" placeholder="Put a name here" />

const WrappedCompanyForm = Form.create({ name: 'company_form' })(PositionForm);

export default WrappedCompanyForm;