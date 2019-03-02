import React from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Spin, Card
} from 'antd';
import { connect } from 'react-redux'

import axios from "axios";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class EditProfilePage extends React.Component {

    state = {
        userdata: {}
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });

        const id = this.props.id;
        const { form } = this.props;

        axios.put(`http://127.0.0.1:8000/api/profile/${id}/`,
            form.getFieldsValue(),
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


    setInitialValues = () => {
        const { form } = this.props;
        const userdata = this.state.userdata;
        console.log('SET INITIAL VALUES ', userdata);
        form.setFieldsValue({

            first_name: userdata.first_name,
            last_name : userdata.last_name,
            email : userdata.email
        });

    };

    getUserData(token) {
        // const header = (token === undefined) ? null : { headers: { 'Authorization' : 'Token ' + token }};

        const id = this.props.id;
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

    render() {

        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

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



                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">Submit Changes</Button>
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
        id: state.id
    };
};

const WrappedEditProfilePage = Form.create({ name: 'editprofilepage' })(EditProfilePage);

export default connect(mapStateToProps)(WrappedEditProfilePage);


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