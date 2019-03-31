import React from 'react';
import {
	Form, Input, Button, Icon
} from 'antd';

import axios from 'axios';
import TagSelection from "../containers/TagSelection";


class CompanyForm extends React.Component {

	constructor(props){
		super(props);
		this.state={
			selected_tags: this.props.tags
		};

	}


	 addTag = (tag) =>{
	 	 let tags = this.state.selected_tags;
	 	 tags.push(tag);
	 	 this.setState({selected_tags:tags});
		 console.log(this.state.selected_tags);
	 }
	 removeTag = (tag) => {
		 let tags = this.state.selected_tags;
		 TagSelection.removeObject(tag,tags);
		 this.setState({selected_tags:tags});

		 console.log(this.state.selected_tags);
	 }


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
		let data = this.props.form.getFieldsValue();
		data['tags_id'] = TagSelection.format_to_data(this.state.selected_tags);
		console.log(data);

		switch (requestType) {
			case 'post':
				axios.post(companyURL, data, {
					headers: { Authorization : 'Token ' + this.props.authToken }
				})
				.then((res) => {
					console.log(res);
					this.props.onSuccess(res.data);
					TagSelection.increment_tag_times_used(this.state.selected_tags);
				})
				.catch((err) => console.error(err));
				break;
			case 'patch':
				axios.patch(companyURL, data, {
					headers: { Authorization : 'Token ' + this.props.authToken }
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
	}

	/*(event) =>
					this.handleFormSubmit(
						event,
						this.props.requestType,
						this.props.companyURL
					)} */

	render() {
		const { getFieldDecorator } = this.props.form;
		let tags = this.state.selected_tags;
		return (
			<div>
				<Form >
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
					{this.props.requestType === 'patch' ?
						<div>
					<Form.Item
						label="Tags"
					>

					</Form.Item>


						<TagSelection url={this.props.companyURL} addTag={this.addTag} removeTag={this.removeTag} selected_tags = {tags}/>
						</div>
						:
						<div></div>
					}

					<Form.Item>
						<Button type="primary"  onClick={this.handleFormSubmit.bind(this)}>{this.props.buttonText}</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

// <Input name="email" placeholder="Put your email here" />
// <Input name="name" placeholder="Put a name here" />

const WrappedCompanyForm = Form.create({ name: 'company_form' })(CompanyForm);

export default WrappedCompanyForm;