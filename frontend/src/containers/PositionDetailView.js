import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import {Card, Button, Form, Input, Icon, TextArea} from 'antd';

import PositionForm from '../components/PositionForm';
import PositionApplyForm from '../components/PositionApplyForm';
import TagSelection from "../components/CompanyForm";


class PositionDetail extends Component {

    // constructor(props) {
    // 	super(props);

    // 	this.state({})
    // }

    constructor(props) {
        super(props);

        this.state = {
            position: {
                company: {name: ''},
                name: '',
                description: '',
                is_owner: false
            },
            showForm: false,
            showApply: false,
            // companySlug: props.match.params.companySlug
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.token === null && nextProps.token !== null) {
            this.getPosition(nextProps.token);
        }
    }

    redirect() {
        this.props.history.goBack();
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

    handleDelete = (event) => {
        const positionID = this.props.match.params.positionID;
        axios.delete(`http://127.0.0.1:8000/api/positions/${positionID}/`, {
            headers: {'Authorization': 'Token ' + this.props.token}
        })
            .then(this.redirect());
        // Kunne brukt denne, men den refresher ikke den '/' siden!
        // this.props.history.push('/');
        // Kunne også brukt denne
        this.forceUpdate();
        // men det blir litt 'messy'

    }

    toggleEdit(event) {
        this.setState({
            showForm: !this.state.showForm
        });
    }

    toggleApply(event) {
        this.setState({
            showApply: !this.state.showApply
        });
    }


    renderEditButton() {
        if (this.state.position.is_owner) {
            return (
                <Button onClick={(event) => this.toggleEdit()} style={{marginTop: '10px'}}>
                    Edit
                </Button>
            );
        }
    }

    renderApplyButton() {
        if (!this.state.position.is_owner && !this.state.showApply) {
            return (
                <Button type="primary" onClick={(event) => this.toggleApply(event)} style={{marginTop: '10px'}}>
                    Apply
                </Button>
            );
        }
    }

    renderUpdateDeleteForm() {
        if (this.state.position.is_owner && this.state.showForm) {
            // const slug = this.state.position.company.slug;
            const positionID = this.props.match.params.positionID;
            return (
                <div>
                    <PositionForm
                        requestType='put'
                        authToken={this.props.token}
                        companyURL={`http://127.0.0.1:8000/api/positions/${positionID}/`}
                        onSuccess={this.redirect.bind(this)}
                        buttonText='Update'
                    />
                    <Button type='danger' onClick={this.handleDelete.bind(this)}>Delete</Button>
                </div>
            );
        }
    }

    handleApply(event) {

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

    renderApplyForm() {
        if (!this.state.position.is_owner && this.state.showApply) {
            // const slug = this.state.position.company.slug;
            const positionID = this.props.match.params.positionID;
            return (<div> <PositionApplyForm id={positionID}>
                </PositionApplyForm>
                </div>
            );
        }
    }


    render() {
        return (
            <div>
                <Card title={this.state.position.company.name}>
                    <p>{this.state.position.name}</p>
                    <p>{this.state.position.description}</p>
                </Card>
                {this.renderEditButton()}
                {this.renderUpdateDeleteForm()}
                {this.renderApplyButton()}
                {this.renderApplyForm()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(PositionDetail);