import React from 'react';

import {List, Avatar, Tag, Button} from 'antd';

import TagSelection from "../containers/TagSelection";


// const IconText = ({ type, text }) => (
// 	<span>
// 		<Icon type={type} style={{ marginRight: 8 }} />
// 		{text}
// 	</span>
// );

const Applications = (props) => {
	return (
		<List
			itemLayout="vertical"
			size="large"
			pagination={{
				onChange: (page) => {
					console.log(page);
				},
				pageSize: 10,
			}}
			dataSource={props.data}
			// footer={<div><b>ant design</b> footer part</div>}
			renderItem={item => (
				<List.Item
					key={"Your application on the Company: " + item.position.name}
					// actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
					extra={<img width={136} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
				>
					<List.Item.Meta
						title={"Application on: " + item.position.name}
					/>


					{"Your application text: " + item.text}
				</List.Item>
			)}
		/>
	);
};
/* onClick = {props.removeApplication.bind(item,item)}*/
export default Applications;