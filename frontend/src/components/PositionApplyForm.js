import React from 'react';
import {
	Form, Input, Button, Icon
} from 'antd';



import axios from 'axios';
import {connect} from "react-redux";
import TagSelection from "../containers/TagSelection";


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

		let data = this.props.form.getFieldsValue();


		const { requestType} = this.props;

		switch (requestType) {
			case 'post':
				axios.post(`http://localhost:8000/api/positions/${this.props.id}/apply/`, data, {
					headers: { Authorization : 'Token ' + this.props.token }
				})
					.then((res) => {
						console.log(res);
						this.props.onSuccess(res.data);
						TagSelection.increment_tag_times_used(this.state.selected_tags);
					})
					.catch((err) => console.error(err));
				break;
			case 'patch':
				axios.patch(`http://localhost:8000/api/myapplications/${this.props.id}/apply/`, data, {
					headers: { Authorization : 'Token ' + this.props.token }
				})
					.then((res) => {
						console.log(res);
						this.props.onSuccess(res.data);
						TagSelection.increment_tag_times_used(this.state.selected_tags);
					})
					.catch((err) => {
						console.log('We got an error');
						console.error(err);
					});

				break;
			default:
				console.log('what');
		}


		axios.post(`http://localhost:8000/api/positions/${this.props.id}/apply/`, this.props.form.getFieldsValue(), {
			headers: { Authorization : 'Token ' + this.props.token }
		})
			.then((res) => {
				console.log(res);
				this.props.onSuccess();

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
					label="text"
				>
					{getFieldDecorator('text', {
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
const mapStateToProps = (state) => {
	// console.log('This state: ', state);
	return {
		token: state.token
	};
};
const WrappedCompanyForm = Form.create({ name: 'application_form' })(PositionApplyForm);

export default connect(mapStateToProps)(WrappedCompanyForm);