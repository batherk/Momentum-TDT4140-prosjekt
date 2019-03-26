import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import {Button, Card, Form, Icon, Input, TextArea} from 'antd';
import {Link} from "react-router-dom";
import TagSelection from "../components/CompanyForm";


class PositionDetail extends Component {

    // constructor(props) {
    // 	super(props);

    // 	this.state({})
    // }

    state = {
        position: {
            company: {name: ''},
            name: '',
            description: ''
        },

        showApply: false
    };

    componentDidMount() {
        // this.getCompany(this.props.token);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.token === null && nextProps.token !== null) {
            this.getPosition(nextProps.token);
        }
    }

    getPosition = (token) => {
        const positionID = this.props.match.params.positionID;
        axios.get(`http://127.0.0.1:8000/api/positions/${positionID}/`, {
            headers: {'Authorization': 'Token ' + token}
        })
            .then(res => {
                console.log('Data om posisjonen: ', res);
                this.setState({
                    position: res.data
                });
            });
    }


    toggleEdit(event) {
            this.setState({
                showApply: !this.state.showApply
            });
    }

    handleDelete = (event) => {
        const positionID = this.props.match.params.positionID;
        axios.delete(`http://127.0.0.1:8000/api/startups/${positionID}/`);
        // Kunne brukt denne, men den refresher ikke den '/' siden!
        // this.props.history.push('/');
        // Kunne også brukt denne
        // this.forceUpdate();
        // men det blir litt 'messy'

    }

    handleFormSubmit(event) {

        event.preventDefault();

        console.log('props: ', this.props);

        const { requestType, companyURL } = this.props;

        let data = this.props.form.getFieldsValue();
        console.log(data);

/*
        axios.post('/api/positions/:id/apply', data, {
            headers: { Authorization : 'Token ' + this.props.token }
        })
            .then((res) => {

            })
            .catch((err) => console.error(err));*/
    }


    render_apply_form() {

        if (this.state.showApply) {
            const { getFieldDecorator } = this.props.form;
            return (

                <div>
                    <Form >
                        <Form.Item
                            label="Application"
                        >
                            {getFieldDecorator('application', {
                                rules: [{ required: true, message: 'Please write your application for this position' }],
                            })(
                                <Input.TextArea required rows={8}  style={{"margin":"0px"}}/>
                            )}
                        </Form.Item>

                       <Form.Item>
                           <Button onClick={this.handleFormSubmit.bind(this)} type='primary' style={{ marginTop: '10px' }}>
                               Send
                           </Button>
                        </Form.Item>
                    </Form>


                </div>
            );

        } else
            return (<Button onClick={(event) => this.toggleEdit()} type='primary' style={{marginTop: '10px'}}>
                Apply
            </Button>);
    }

    render() {
        return (
            <div>
                <Card title={this.state.position.company.name}>
                    <p>{this.state.position.name}</p>
                    <p>{this.state.position.description}</p>

                    {this.render_apply_form()}


                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    };
};
const WrappedCompanyForm = Form.create({ name: 'apply_form' })(PositionDetail);

export default connect(mapStateToProps)(WrappedCompanyForm);

