import React from 'react';
import {
	Form, Input, Button,
} from 'antd';

import axios from 'axios';

/*

Skal bruke denne når vi skal lage og oppdatere en bedrift
Må derfor spesifisere om vi skal lage eller oppdatere når vi bruker denne komponenten

*/



class CustomForm extends React.Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		formLayout: 'horizontal',
	// 	};
	// }

	// handleFormLayoutChange = (e) => {
	// 	this.setState({ formLayout: e.target.value });
	// }

	handleFormSubmit = (event, requestType, companyID) => { // requestType is 'post' og 'put'
		// event.preventDefault();

		// Value er '' (tom streng) hvis du ikke putter noe i inputet
		const name = event.target.elements.name.value;
		const email = event.target.elements.email.value;
		const info = event.target.elements.info.value;

		// console.log(name, email, info);
		// const data = {  };
		let data = {};
		if (name !== '') data['name'] = name;
		if (email !== '') data['email'] = email;
		if (info !== '') data['info'] = info;


		console.log(data);

		switch (requestType) {
			case 'post':
				axios.post('http://127.0.0.1:8000/api/startup/', {
					name: name,
					email: email,
					info: info
				})
				.then((res) => console.log(res))
				.catch((err) => console.error(err));
				break;
			case 'put':
				axios.put(`http://127.0.0.1:8000/startup/${companyID}/`, data)
				.then((res) => console.log(res))
				.catch((err) => {
					console.log('We got an error');
					console.error(err);
				});
				break;
			default:
				console.log('what');
		}
	}

	render() {
		// const { formLayout } = this.state;
		// const formItemLayout = formLayout === 'horizontal' ? {
		// 	labelCol: { span: 4 },
		// 	wrapperCol: { span: 14 },
		// } : null;
		// const buttonItemLayout = formLayout === 'horizontal' ? {
		// 	wrapperCol: { span: 14, offset: 4 },
		// } : null;
		return (
			<div>
				<Form onSubmit={(event) => 
					this.handleFormSubmit(
						event, 
						this.props.requestType,
						this.props.companyID 
					)} 
				>
					<Form.Item
						label="Name"
					>
						<Input name="name" placeholder="Put a name here" />
					</Form.Item>
					<Form.Item
						label="Email"
					>
						<Input name="email" placeholder="Put your email here" />
					</Form.Item>
					<Form.Item
						label="Info"
					>
						<Input name="info" placeholder="Put some info about yout company here" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">{this.props.buttonText}</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

export default CustomForm;