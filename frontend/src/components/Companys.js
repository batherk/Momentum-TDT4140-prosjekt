import React from 'react';

import { List, Avatar } from 'antd';


// const IconText = ({ type, text }) => (
// 	<span>
// 		<Icon type={type} style={{ marginRight: 8 }} />
// 		{text}
// 	</span>
// );

const Companys = (props) => {
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
					key={item.title}
					// actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
					extra={<img width={136} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
				>
					<List.Item.Meta
						avatar={<Avatar src={item.avatar} />}
						title={<a href={`/companys/${item.slug}`}>{item.name}</a>}
						description={item.info}
					/>
					{item.content}
				</List.Item>
			)}
		/>
	);
};

export default Companys;