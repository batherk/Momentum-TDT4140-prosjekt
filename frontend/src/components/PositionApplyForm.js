import React from 'react';
import {
	Form, Input, Button, Icon
} from 'antd';



import axios from 'axios';


class PositionApplyForm extends React.Component {
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
	handleApply(event) {
				event.preventDefault();

                console.log('props: ', this.props);


                console.log(this.props.form.getFieldsValue());


		axios.post(`http://localhost:8000/api/positions/${this.props.id}/apply/`, this.props.form.getFieldsValue(), {
			headers: { Authorization : 'Token ' + this.props.authToken }
		})
			.then((res) => {
				console.log("WORKED!");
				console.log(res);
			})
			.catch((err) => console.error(err));

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
				<Form.Item
					label="Application"
				>
					{getFieldDecorator('Application', {
						rules: [{required: true, message: 'Please write your application for the position'}],
					})(
						<Input.TextArea row={16}/>
					)}
				</Form.Item>
				<Form.Item>
					<Button type="primary"
							onClick={this.handleApply.bind(this)}>Send</Button>
				</Form.Item>
			</div>
		);
	}
}

// <Input name="email" placeholder="Put your email here" />
// <Input name="name" placeholder="Put a name here" />

const WrappedCompanyForm = Form.create({ name: 'application_form' })(PositionApplyForm);

export default WrappedCompanyForm;