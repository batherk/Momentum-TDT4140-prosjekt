import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

import Applicants from '../components/Applicants';


class ApplicantsList extends Component {

    state = {
        applicants: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/applicants/', {
            headers: { Authorization : 'Token ' + this.props.token }
        })
        .then(res => {
            this.setState({
                applicants: res.data
            });
            console.log(res.data);
        });
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.token === null && nextProps.token !== null) {
            axios.get('http://127.0.0.1:8000/api/applicants/', {
                headers: { Authorization : 'Token ' + this.props.token }
            })
            .then(res => {
                this.setState({
                    applicants: res.data
                });
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            })
        }

    }

    render(){
        return(
            <div>
                <Applicants data={this.state.applicants}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	// console.log('This state: ', state);
	return {
		token: state.token
	};
};

export default connect(mapStateToProps)(ApplicantsList);