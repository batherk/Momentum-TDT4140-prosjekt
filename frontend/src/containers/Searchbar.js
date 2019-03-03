import React from 'react';
import { Input } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
// import axios from "axios";

// const { Header, Content, Footer } = Layout;


const Search = Input.Search;

class Searchbar extends React.Component {

    state = {
    };


    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {

    }
/* onSearch={value => console.log(value)}*/
    render () {
        return (
            <div>
                <Search
                    placeholder="Søk på bedrifter"
                    onSearch={value => {this.props.history.push(`/companys/search/${value}/`)}}
                    style={{ width: 200 }}
                />

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const mapStateToProps = (state) => {
    return {
        token : state.token
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Searchbar));