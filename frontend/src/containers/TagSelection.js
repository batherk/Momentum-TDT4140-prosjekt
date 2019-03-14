import React from 'react';
import CustomTag from '../components/CustomTag';
import {Icon, Spin, Card, Tag, Avatar, Input, Button} from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

// import * as actions from '../store/actions/auth';
import axios from "axios";
import {List} from "antd/lib/list";
const Search = Input.Search;
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

function sameTagName(obj, list) {
    if(obj === undefined)
        return null;
    if(obj.name === "" || obj.name === " ")
        return null;
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].name.toLowerCase() === obj.name.toLowerCase()) {
            return list[i];
        }
    }

    return null;
}


class TagSelection extends React.Component {

    state = {
        tags:[],
        selected_tags:[],
        displayed_tags:[],
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
                this.setState({
                    tags: res.data,
                    displayed_tags:res.data
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    getSearchedTags(search){
        axios.get(`http://127.0.0.1:8000/api/tags/?search=${search}`)
            .then(res => {
                this.setState({
                    displayed_tags: res.data
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
        if(inputValue === "" || inputValue === " "){
            return;
        }
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }

        let randomNumb = Math.floor((Math.random() * 10) );
        let tag = {
            name: inputValue,
            times_used: 1,
            color: randomNumb

        }
        let original_tag = sameTagName(tag,this.state.tags);
        if(original_tag != null){
            if(containsObject(original_tag,this.state.selected_tags) === false){
                this.state.selected_tags.push(original_tag);
                this.setState({
                    selected_tags: this.state.selected_tags,
                    tags: this.state.tags,
                    inputVisible: false,
                    inputValue: '',
                })
            }
        }
        else{
            axios.post(`http://127.0.0.1:8000/api/tags/`, tag)
                .then(res => {
                    console.log('DATA RESPONSE FROM AXIOS POST: ', res);
                    tag = res.data;
                    this.state.tags.push(tag);
                    this.state.selected_tags.push(tag);
                    this.setState({
                        selected_tags: this.state.selected_tags,
                        tags: this.state.tags,
                        inputVisible: false,
                        inputValue: '',
                    })
                })
                .catch(err => {
                    console.error(err);
                });


        }

    }

    onSubmitForm = () => {


        //axios.put(`http://127.0.0.1:8000/api/tags/38`, {id:'38',name:'p',times_used:'20',color:'1'})
        axios.all(this.state.selected_tags.map(u => {u.times_used ++;console.log("TAG ELEEMENT",u);axios.put(`http://127.0.0.1:8000/api/tags/${u.id}/`,u);}))
            .then(axios.spread((...res) => {




            }))
            .catch(err => {
                console.error(err);
            });

        axios.patch(this.props.url, {tags:this.state.selected_tags}, {
            headers: { Authorization : 'Token ' + this.props.token }

        })
            .then((res) => console.log(res))
            .catch((err) => {
                console.log('We got an error');
                console.error(err);
            });
    }


    saveInputRef = input => this.input = input


    render() {
        return (

            <div style={{height:"250px", width:"600px",   overflowY: "scroll"}}>

                {
                    this.props.loading ?
                        <Spin indicator={antIcon} />
                        :

                        <div >
                            <h2>Velg tags</h2>
                        <Card style={{paddingTop:"0px"}}>


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
                                    <Icon type="plus" /> Ny Tag
                                </Tag>
                            )}



                        </Card>
                        <Card>
                            <div >
                                <Search
                                    placeholder="Søk på tags"
                                    onSearch={value => {this.getSearchedTags(value)}}
                                    style={{ width: 150 }}
                                />
                            </div>
                            <CustomTag data={this.state.displayed_tags} handleClickOnTag={this.handleClickOnTag}/>

                            <Button onAction={this.onSubmitForm}>Submit</Button>
                        </Card>

                        </div>




                }
            </div>
        );
    }
}

/*                            <Button onClick={this.onSubmitForm}>SUBMIT</Button>*/

const mapStateToProps = (state) => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(TagSelection);