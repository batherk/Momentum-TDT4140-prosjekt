import React from 'react';
import { Route } from 'react-router-dom';

import CompanyList from './containers/CompanyListView';
import CompanyDetail from './containers/CompanyDetailView';
import PositionList from './containers/PositionListView';
import PositionDetail from './containers/PositionDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
	<div>
		<Route exact path='/' component={CompanyList} />
		<Route exact path='/companys/:companySlug/' component={CompanyDetail} />
		<Route exact path='/positions' component={PositionList} />
		<Route exact path='/positions/:positionID/' component={PositionDetail} />
		<Route exact path='/login/' component={Login} />
		<Route exact path='/signup/' component={Signup} />
	</div>
);

export default BaseRouter;
