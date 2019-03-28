import React from 'react';

import {List, Avatar, Tag, Button} from 'antd';

import TagSelection from "../containers/TagSelection";
import Certified from "./Applicants";


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
					key={<div>{item.applicant.first_name} {item.applicant.last_name} <Certified certified={item.applicant.is_certified} /></div>
					}
					extra={item.applicant.email}
				>
					<List.Item.Meta
						title={item.applicant.first_name + " " + item.applicant.last_name}
					/>
					{"education" + item.applicant.education}

					{item.text}



				</List.Item>
			)}
		/>
	);
};

export default ApplicationsOnPosition;