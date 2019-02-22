import React from 'react';
import { Route } from 'react-router-dom';

import CompanyList from './containers/CompanyListView';
import CompanyDetail from './containers/CompanyDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
	<div>
		<Route exact path='/' component={CompanyList} />
		<Route exact path='/companys/:companyID/' component={CompanyDetail} />
		<Route exact path='/login/' component={Login} />
		<Route exact path='/signup/' component={Signup} />
	</div>
);

export default BaseRouter;
