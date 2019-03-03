import React from 'react';
import { List, Tag, Button } from 'antd';

function getColorPreset(id){
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

const CustomTag = (props) => {
    return props.data.map((item) =>
            <Tag key={item.id} color={getColorPreset(item.color)} onClick={props.handleClickOnTag.bind(item,item)} >
                {item.name} ({item.times_used})
            </Tag>
        );
};


export default CustomTag;