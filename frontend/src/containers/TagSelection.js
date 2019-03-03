import React from 'react';
import CustomTag from '../components/CustomTag';
import {Icon, Spin, Card, Tag, Avatar, Input} from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

// import * as actions from '../store/actions/auth';
import axios from "axios";
import {List} from "antd/lib/list";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const { Meta } = Card;


function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

function removeObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            delete list[i];
            return true;
        }
    }

    return false;
}


class TagSelection extends React.Component {

    state = {
        tags:[],
        selected_tags:[],
        inputVisible: false,
    };



    componentWillReceiveProps(nextProps) {
        this.getTags();
    }

    componentDidMount() {
        this.getTags();
    }
    getTags() {
        axios.get(`http://127.0.0.1:8000/api/tags/`)
            .then(res => {
                console.log('Data om brukeren: ', res);
                this.setState({
                    tags: res.data
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleClickOnTag = (tag) => {
        let tags = this.state.selected_tags;
        if(containsObject(tag,tags)){
            removeObject(tag,tags);
            this.setState({
                selected_tags: tags
            })
        }
        else{
            this.state.selected_tags.push(tag);
            this.setState({
                selected_tags: tags
            })

        }
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }


        const tag{
            ""
        }

        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef = input => this.input = input


    render() {
        return (

            <div>
                {
                    this.props.loading ?
                        <Spin indicator={antIcon} />
                        :

                        <div>
                        <Card>
                            <CustomTag data={this.state.selected_tags} handleClickOnTag={this.handleClickOnTag}/>
                            {this.state.inputVisible && (
                                <Input
                                    ref={this.saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{ width: 78 }}
                                    value={this.state.inputValue}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputConfirm}
                                    onPressEnter={this.handleInputConfirm}
                                />
                            )}
                            {!this.state.inputVisible && (
                                <Tag
                                    onClick={this.showInput}
                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                >
                                    <Icon type="plus" /> New Tag
                                </Tag>
                            )}
                        </Card>
                        <Card>
                            <CustomTag data={this.state.tags} handleClickOnTag={this.handleClickOnTag}/>
                        </Card>
                        </div>



                }
            </div>
        );
    }
}


export default connect()(TagSelection);