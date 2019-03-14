import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

import Positions from '../components/Positions';
// import CompanyForm from '../components/CompanyForm';

// const listData = [];
// for (let i = 0; i < 23; i++) {
// 	listData.push({
// 		href: 'http://ant.design',
// 		title: `ant design part ${i}`,
// 		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
// 		description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
// 		content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// 	});
// }

class PositionSearchResults extends Component {

	state = {
		search: null,
		positions: []
	};

	componentDidMount() {
		this.getPositions();

		this.setState({
			search: this.props.match.params.search
		});
	}

	// componentWillReceiveProps(nextProps) {
	//  //    if (this.props.token === null && nextProps.token !== null) {
	//  //		this.getProfile(nextProps.token, nextProps.id);
	// 	// }
	// }

	getPositions() {
		// console.log("LIIIINK ", `http://127.0.0.1:8000/api/startups/?search=${this.props.match.params.search}`)
		axios.get(`http://127.0.0.1:8000/api/positions/?search=${this.props.match.params.search}`,{headers: { Authorization : 'Token ' + this.props.token }})
		.then(res => {this.setState({ positions: res.data}); console.log("SEARCHIING",this.state.positions);})
		.catch(err => console.error(err));
	}

	render() {
		return (
			<div>
				<div>
					<Positions data={this.state.positions} />
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	console.log('This state: ', state);
	return {
		token: state.token,
		id: state.id
	};
};

export default connect(mapStateToProps)(PositionSearchResults);