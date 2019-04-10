import React from 'react';
import {
	Form, Input, Icon, Button, Spin, Checkbox, Upload
} from 'antd';
import { connect } from 'react-redux'

import axios from "axios";
import * as actions from "../store/actions/auth";

import ProfilePageAvatarUpload from '../containers/ProfilePageAvatarUpload';
// import Checkbox from "antd/es/checkbox";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
/*
import FormData from 'form-data'*/


class ProfilePageEdit extends React.Component {

	state = {
		userdata: {
			visible: false,
			cv : null
		},
		image : null
	};



	componentWillReceiveProps(nextProps) {
		if (this.props.token === null && nextProps.token !== null) {
			this.getUserData(nextProps.token);
		}


	}

	componentDidMount() {
		if (this.props.token) {
			this.getUserData(this.props.token);
		}
	}

	handleImageChange = (image) => {
		this.setState({
			image: image
		});
	}

	handleSubmit = (e) => {

		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});

		const id = parseInt(localStorage.getItem('id'));
		const { form } = this.props;

		let data = form.getFieldsValue();
		data['role'] = this.state.userdata.role;
		data['visible'] = this.state.userdata.visible;

		//let cvs = form.getFieldsValue().cv;
		//if(cvs.length > 0){

		//}

		if(this.state.image != null) {
			data["photo"] = this.state.image;
		}
		console.log("TEST:",data);
		axios.patch(`http://127.0.0.1:8000/api/profile/${id}/`,
			data,
			{
				headers: {
					'Authorization' : 'Token ' + this.props.token
				}
			}
		)
		.then((res) => {console.log(res); this.props.history.push('/profile/')})
		.catch((err) => {
			console.log('We got an error');
			console.error(err);
		});

	}

	handleDelete = (e) => {
		const id = parseInt(localStorage.getItem('id'));
		axios.delete(`http://127.0.0.1:8000/api/profile/${id}/`,
			{ headers: { 'Authorization' : 'Token ' + this.props.token } }
		)
		.then((res) => {console.log(res); this.props.logout();  this.props.history.push('/')})
		.catch((err) => {
			console.log('We got an error');
			console.error(err);
		});
	}


	setInitialValues = () => {
		const { form } = this.props;
		const userdata = this.state.userdata;
		console.log('SET INITIAL VALUES ', userdata);
		form.setFieldsValue({
			first_name: userdata.first_name,
			last_name: userdata.last_name,
			email: userdata.email,
			// visible: userdata.visible,
		});

	};

	getUserData(token) {
		// const header = (token === undefined) ? null : { headers: { 'Authorization' : 'Token ' + token }};

		const id = parseInt(localStorage.getItem('id'));
		axios.get(`http://127.0.0.1:8000/api/profile/${id}/`, {
			headers: { 'Authorization' : 'Token ' + token }
		})
			.then(res => {
				//console.log('Data om brukeren: ', res);
				this.setState({
					userdata: res.data
				});

				this.setInitialValues();
			})
			.catch(err => {
				console.error(err);
			});
	}


	handleChange = (info) => {
		let fileList = info.fileList;

		// 1. Limit the number of uploaded files
		// Only to show two recent uploaded files, and old ones will be replaced by the new
		fileList = fileList.slice(-1);


		// 2. Read from response and show file link
		/*fileList = fileList.map((file) => {
			if (file.response) {
				// Component will show file.url as link
				file.url = file.response.url;
			}
			return file;
		});*/

		// 3. Filter successfully uploaded files according to response from server
		/*fileList = fileList.filter((file) => {
			if (file.response) {
				return file.response.status === 'success';
			}
			return false;
		});*/

		this.setState({ fileList });
	}


	renderCV(){

		if(this.props.profile.role === 3){
			const props = {
				action: '//jsonplaceholder.typicode.com/posts/',
				onChange: this.handleChange,
				multiple: true,
			};
			const { getFieldDecorator } = this.props.form;
			const formItemLayout = {
				labelCol: {
					xs: { span: 24 },
					sm: { span: 8 },
				},
				wrapperCol: {
					xs: { span: 24 },
					sm: { span: 16 },
				},
			};
			return (<Form.Item
				{...formItemLayout}
				label={(
					<span>Education </span>
				)}
			>
				{getFieldDecorator('education', {
					rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
				})(
					<Input />
				)}
			</Form.Item>);
		}
	}

	render() {

		const { getFieldDecorator } = this.props.form;
		// const { autoCompleteResult } = this.state;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
		   wrapperCol: {
			   xs: { span: 24 },
			   sm: { span: 16 },
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 8,
				},
			},
		};
		return (

			<div style={{"width":"50%", "margin":"auto"}}>
				{
					this.props.loading ?
						<Spin indicator={antIcon} />
						:

						<Form onSubmit={this.handleSubmit}>

							<Form.Item
								{...formItemLayout}
								label={(
									<span> Avatar </span>
								)}
							>
								<ProfilePageAvatarUpload handleImageChange={this.handleImageChange}/>
								{/*getFieldDecorator('first_name', {
									rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
								})(
									
								) */}
							</Form.Item>

							<Form.Item
								{...formItemLayout}
								label={(
									<span> First Name </span>
								)}
							>
								{getFieldDecorator('first_name', {
									rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
								})(
									<Input />
								)}
							</Form.Item>
							<Form.Item
								{...formItemLayout}
								label={(
									<span> Last Name </span>
								)}
							>
								{getFieldDecorator('last_name', {
									rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
								})(
									<Input />
								)}
							</Form.Item>


							<Form.Item
								{...formItemLayout}
								label="E-mail"
							>
								{getFieldDecorator('email', {
									rules: [{
										type: 'email', message: 'The input is not valid E-mail!',
									}, {
										required: true, message: 'Please input your E-mail!',
									}],
								})(
									<Input />
								)}
							</Form.Item>


							<Form.Item
								{...formItemLayout}
								label="Is searchable"
							>
								{getFieldDecorator('visible', {
									required: true, message: 'Give a value to the boolean field',
								})(
									<Checkbox 
										checked={this.state.userdata.visible}
										onChange={(prevState) => this.setState({ 
											userdata: {
												...prevState,
												visible: !this.state.userdata.visible
											}
										})}
									/>
								)}
							</Form.Item>

							{this.renderCV()}




							<Form.Item {...tailFormItemLayout}>
								<Button type="primary" htmlType="submit">Submit Changes</Button>
								<Button type="danger" onClick={this.handleDelete.bind(this)} style ={{"float":"right",}}>Delete me</Button>
							</Form.Item>
						</Form>
				}
			</div>
		);
	}
}



const mapStateToProps = (state) => {
	console.log(state);
	return {
		token: state.token,
		id: state.id,
		profile: state.profile
	};
};


const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(actions.logout())
	};
};


const WrappedEditProfilePage = Form.create({ name: 'editprofilepage' })(ProfilePageEdit);

export default connect(mapStateToProps,mapDispatchToProps)(WrappedEditProfilePage);


/*
							<Form.Item
								{...formItemLayout}
								label="Password"
							>
								{getFieldDecorator('password', {
									rules: [{
										required: false, message: 'Please input your password!',
									}, {
										validator: this.validateToNextPassword,
									}],
								})(
									<Input type="password" />
								)}
							</Form.Item>
							<Form.Item
								{...formItemLayout}
								label="Confirm Password"
							>
								{getFieldDecorator('confirm', {
									rules: [{
										required: false, message: 'Please confirm your password!',
									}, {
										validator: this.compareToFirstPassword,
									}],
								})(
									<Input type="password" onBlur={this.handleConfirmBlur} />
								)}
							</Form.Item>
							<Form.Item
								{...formItemLayout}
								label={(
									<span>
			  Nickname&nbsp;
										<Tooltip title="What do you want others to call you?">
				<Icon type="question-circle-o" />
			  </Tooltip>
			</span>
								)}
							>
								{getFieldDecorator('nickname', {
									rules: [{ required: false, message: 'Please input your nickname!', whitespace: true }],
								})(
									<Input />
								)}
							</Form.Item>*/