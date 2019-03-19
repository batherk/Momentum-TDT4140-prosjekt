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

    constructor(props){
        super(props);
        this.state={
            tags:[],
            selected_tags:[],
            displayed_tags:[],
            inputVisible: false,
        };
    }
    static getColorPreset(id){
        if(id === 0){
            return "magenta";
        }
        if(id === 1){
            return "red";
        }
        if(id === 2){
            return "volcano";
        }
        if(id === 3){
            return "orange";
        }
        if(id === 4){
            return "gold";
        }
        if(id === 5){
            return "lime";
        }
        if(id === 6){
            return "green";
        }
        if(id === 7){
            return "cyan";
        }
        if(id === 8){
            return "blue";
        }
        if(id === 9){
            return "geekblue";
        }
        if(id === 10){
            return "purple";
        }
        return "magenta";
    }
    static removeObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                //delete list[i];
                list = list.splice(i,1);
                list.length = list.length - 1;
                return true;
            }
        }

        return false;
    }
    static format_to_data(list) {
        let data = [];
        //let data = "[";
        var i;
        for (i = 0; i < list.length; i++) {

            data.push(list[i].id);
            /*
            if(i== 0)
                data += "" + list[i].id;
            else
                data += "," + list[i].id;*/
            //data
        }
        //data += "]";
        return data;
    }

    static get_tags_from_IDs(list,callback){
        let data = [];
        axios.all(list.map(u => {axios.get(`http://127.0.0.1:8000/api/tags/${u}/`);}))
            .then( () => {axios.spread((...res) => {
                data.push(res.data);
            });
            callback(data)
            })
            .catch(err => {
                console.error(err);
            });
    }



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

    select_tag(tag){
        let selected_tags = this.state.selected_tags;
        selected_tags.push(tag);
        this.props.addTag(tag);
        this.setState({selected_tags:selected_tags})
    }
    unselect_tag(tag){
        let selected_tags = this.state.selected_tags;
        TagSelection.removeObject(tag,selected_tags);
        this.props.removeTag(tag);
        this.setState({selected_tags:selected_tags})
    }



    handleClickOnTag = (tag) => {
        let tags = this.state.selected_tags;
        if(containsObject(tag,tags)){
            this.unselect_tag(tag);
            /*removeObject(tag,tags);
            this.setState({
                selected_tags: tags
            })*/
        }
        else{
            this.select_tag(tag);
            /*this.state.selected_tags.push(tag);
            this.setState({
                selected_tags: tags
            })*/

        }
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());

    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }



    handleInputConfirm = () => {
        console.log("I AM ACTULALLY HERE");
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
                this.select_tag(original_tag);
                //this.state.selected_tags.push(original_tag);
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
                    //this.state.selected_tags.push(tag);
                    this.select_tag(tag);
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
        console.log("AM I HERERERERRERERER");

        //axios.put(`http://127.0.0.1:8000/api/tags/38`, {id:'38',name:'p',times_used:'20',color:'1'})
        axios.all(this.state.selected_tags.map(u => {u.times_used ++;console.log("TAG ELEEMENT",u);axios.put(`http://127.0.0.1:8000/api/tags/${u.id}/`,u);}))
            .then(axios.spread((...res) => {




            }))
            .catch(err => {
                console.error(err);
            });

       /* axios.patch(this.props.url, {tags:this.state.selected_tags}, {
            headers: { Authorization : 'Token ' + this.props.token }

        })
            .then((res) => console.log(res))
            .catch((err) => {
                console.log('We got an error');
                console.error(err);
            });*/
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
                        <Card style={{paddingTop:"0px"}}>


                            <CustomTag data={this.state.selected_tags} handleClickOnTag={this.handleClickOnTag}/>


                            {this.state.inputVisible && (
                                <Input
                                    ref={this.saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{ width: 78 }}
                                    value={this.state.inputValue}
                                    onChange={(e) => {
                                        this.handleInputChange(e);
                                    }}
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