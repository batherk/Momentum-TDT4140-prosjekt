import React from 'react';

import {List, Avatar, Tag, Button} from 'antd';

import TagSelection from "../containers/TagSelection";


// const IconText = ({ type, text }) => (
// 	<span>
// 		<Icon type={type} style={{ marginRight: 8 }} />
// 		{text}
// 	</span>
// );

const ApplicationsOnPosition = (props) => {
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
					key={item.applicant.first_name + " " + item.applicant.last_name + "         "
					}
					extra={item.applicant.email}
				>
					<List.Item.Meta
						title={item.applicant.first_name + " " + item.applicant.last_name}
					/>

					{item.text}



				</List.Item>
			)}
		/>
	);
};

export default ApplicationsOnPosition;