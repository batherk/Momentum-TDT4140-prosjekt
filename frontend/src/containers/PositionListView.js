import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import axios from 'axios';

import Positions from '../components/Positions';
const Search = Input.Search;



class PositionList extends Component {

	// constructor(props) {
	// 	super(props);

	// 	this.state({})
	// }

	state = {
		positions: []
	};

	componentDidMount() {
	    axios.get('http://127.0.0.1:8000/api/positions/', {
				headers: { Authorization : 'Token ' + this.props.token }
		})
		.then(res => {
			this.setState({
				positions: res.data
			});
			console.log(res.data);
		});
	    // console.log(this.props);
	}

	componentWillReceiveProps(nextProps) {
	    if (this.props.token === null && nextProps.token !== null) {
			axios.get('http://localhost:8000/api/positions/', {
				headers: { Authorization : 'Token ' + nextProps.token }
			})
			.then(res => {
				console.log('positions', res);
				this.setState({
					positions: res.data
				});
			})
			.catch(err => {
				console.error(err);
			});
		}
	}

	render() {

		console.log('data', this.state.positions);

		return (
			<div>
				<Search
					placeholder="Søk på jobber"
					onSearch={value => {this.props.history.push(`/positions/search/${value}/`)}}
					style={{ width: 200 }}
				/>
				<Positions data={this.state.positions} />
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

export default connect(mapStateToProps)(PositionList);