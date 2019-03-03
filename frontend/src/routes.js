import React from 'react';
import { Route } from 'react-router-dom';

import CompanyList from './containers/CompanyListView';
import CompanyDetail from './containers/CompanyDetailView';
import PositionList from './containers/PositionListView';
import PositionDetail from './containers/PositionDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ProfilePage from './containers/ProfilePage';
import EditProfilePage from './containers/ProfilePageEdit';

const BaseRouter = () => (
	<div>
		<Route exact path='/' component={CompanyList} />
		<Route exact path='/companys/:companySlug/' component={CompanyDetail} />
		<Route exact path='/positions' component={PositionList} />
		<Route exact path='/positions/:positionID/' component={PositionDetail} />
		<Route exact path='/login/' component={Login} />
		<Route exact path='/signup/' component={Signup} />
		<Route exact path='/profile/' component={ProfilePage} />
		<Route exact path='/profile/edit/' component={EditProfilePage} />
	</div>
);

export default BaseRouter;
