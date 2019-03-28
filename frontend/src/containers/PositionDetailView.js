import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import {Card, Button } from 'antd';

import PositionForm from '../components/PositionForm';
import PositionApplyForm from '../components/PositionApplyForm';
// import TagSelection from "../components/CompanyForm";
import ApplicantsOnPosition from "../components/ApplicationsOnPosition";


class PositionDetail extends Component {

	// constructor(props) {
	// 	super(props);

	// 	this.state({})
	// }

	// constructor(props) {
	// 	super(props);

	// 	// console.log('construct pos detail');
	// 	// console.log('token', props.token);
	// 	this.getPosition(props.token);
	// 	this.state = {
	// 		position: {
	// 			company: { name: '' },
	// 			name: '',
	// 			description: '',
	// 			is_owner: false
	// 		},
	// 		showForm: false,
	// 		// companySlug: props.match.params.companySlug
	// 	}
	// }

	// componentWillReceiveProps(nextProps) {
	// 	if (this.props.token === null && nextProps.token !== null) {
	// 		this.getPosition(nextProps.token);
	// 	}
	// }

	

	// getPosition = (token) => {
	// 	const positionID = this.props.match.params.positionID;
	// 	axios.get(`http://127.0.0.1:8000/api/positions/${positionID}/`, {
	// 		headers: { 'Authorization' : 'Token ' + token }
	// 	}) 
	// 	.then(res => {
	// 		console.log('Data om posisjonen: ', res);
	// 		this.setState({
	// 			position: res.data
	// 		});
	// 	});
	// }

	// handleDelete = (event) => {
	// 	const positionID = this.props.match.params.positionID;
	// 	axios.delete(`http://127.0.0.1:8000/api/positions/${positionID}/`, {
	// 		headers: { 'Authorization' : 'Token ' + this.props.token }
	// 	})
	// 	.then(this.redirect());
	// 	// Kunne brukt denne, men den refresher ikke den '/' siden!
	// 	// this.props.history.push('/');
	// 	// Kunne også brukt denne
	// 	this.forceUpdate();
	// 	// men det blir litt 'messy'

	// }

	// toggleEdit(event) {
	// 	this.setState({
	// 		showForm: !this.state.showForm
	// 	});
	// }

	// renderEditButton() {
	// 	if (this.state.position.is_owner) {
	// 		return (
	// 			<Button onClick={(event) => this.toggleEdit()} style={{ marginTop: '10px' }}>
	// 				Edit
	// 			</Button>
	// 		);
	// 	}
	// }

	


    constructor(props) {
        super(props);
        this.getPosition(props.token);
        console.log('hei');
        this.state = {
            position: {
                company: {name: ''},
                name: '',
                description: '',
                is_owner: false,
                applications: []
            }
            ,
            showForm: false,
            showApply: false,
            // companySlug: props.match.params.companySlug
        }
    }

    componentWillMount() {
        this.getPosition(this.props.token);
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

    redirect() {
		const slug = this.props.match.params.companySlug;
		this.props.history.push(`/companys/${slug}/`);
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
    	console.log('toggle');
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

    renderUpdateDeleteForm() {
		if (this.state.position.is_owner && this.state.showForm) {
			// const slug = this.state.position.company.slug;
			const positionID = this.props.match.params.positionID;

			console.log('state.position', this.state.position);
			return (
				<div>
					<PositionForm
						requestType='put'
						authToken={this.props.token}
						companyURL={`http://127.0.0.1:8000/api/positions/${positionID}/`}
						onSuccess={this.redirect.bind(this)}
						buttonText='Update'
						data={this.state.position}
					/>
					<Button type='danger' onClick={this.handleDelete.bind(this)}>Delete</Button>
				</div>
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


    renderApplyForm() {
        if (!this.state.position.is_owner && this.state.showApply) {
            // const slug = this.state.position.company.slug;
            const positionID = this.props.match.params.positionID;
            return (<div> <PositionApplyForm id={positionID} onSuccess={()=>{this.props.history.push('/')}}>
                </PositionApplyForm>
                </div>
            );
        }
    }



    remove(id, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                //delete list[i];
                list = list.splice(i,1);
                list.length = list.length - 1;
                return true;
            }
        }

        return false;
    }
    removeApplication = (item) =>{

        console.log("AM I HERERER1");
        let position = this.state.position;
        if(position === undefined){
            return;
        }
        console.log("AM I HERERER2");
        let list = position.applications;
        console.log("Old POSITION", position);
        console.log("ID ", item);
        this.remove(item.id,list);
        position['applications'] = list;
        const positionID = this.props.match.params.positionID;
        console.log("NEW POSITION", position);
        axios.put(`http://127.0.0.1:8000/api/positions/${positionID}/`, position, {
            headers: {'Authorization': 'Token ' + this.props.token}
        })
            .then((res) => {
                console.log('Data om posisjonen 2 22: ', res);
                this.state.position['applications'] = res.data.applications;
                this.forceUpdate();
                /*this.setState({
                    position:{
                        applications:res.data.applications
                    }
                });*/
            });

    }
    renderApplicants() {
        if (this.state.position.is_owner) {
            // const slug = this.state.position.company.slug;
            const positionID = this.props.match.params.positionID;
            return (<div>
                    <h2 style={{marginTop:"20px"}}>The applicants on this position:</h2>
                    <ApplicantsOnPosition data={this.state.position.applications} removeApplication={this.removeApplication}/>
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
                {this.renderApplicants()}
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