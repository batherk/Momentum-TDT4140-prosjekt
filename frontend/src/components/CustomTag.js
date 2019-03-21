import React from 'react';
import { Tag } from 'antd';

import TagSelection from "../containers/TagSelection";

const CustomTag = (props) => {
    return props.data.map((item) =>
            <Tag key={item.id} color={TagSelection.getColorPreset(item.color)} onClick={props.handleClickOnTag.bind(item,item)} >
                {item.name} ({item.times_used})
            </Tag>
        );
};


export default CustomTag;