import React from 'react';

import { List } from 'antd';


// const IconText = ({ type, text }) => (
// 	<span>
// 		<Icon type={type} style={{ marginRight: 8 }} />
// 		{text}
// 	</span>
// );

function renderEducation(item){
    console.log(item);
    return item.education === "" ? <p>no education</p> : <p>{item.education}</p>;
};

const Applicants = (props) => {
	return (
		<List
			itemLayout="vertical"
			size="large"
			pagination={{
				onChange: (page) => {
					console.log(page);
				},
				pageSize: 3,
			}}
			dataSource={props.data}
			// footer={<div><b>ant design</b> footer part</div>}
			renderItem={item => (
				<List.Item
					key={item.email}
					// actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
					// extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
				>
					<List.Item.Meta
						//avatar={<Avatar src={item.avatar} />}
						//title={<a href={`/positions/${item.id}`}>{`${item.company.name}: ${item.name}`}</a>}
						title={`${item.first_name} ${item.last_name}`}
                        description={item.email}
					/>

                        { renderEducation(item) }

					{/*`${item.company.name}: ${item.content}`*/}
				</List.Item>
			)}
		/>
	);
};

export default Applicants;