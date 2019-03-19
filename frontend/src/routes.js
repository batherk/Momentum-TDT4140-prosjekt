import React from 'react';
import { Route } from 'react-router-dom';

import CompanyList from './containers/CompanyListView';
import CompanyCreate from './containers/CompanyCreateView';
import CompanyDetail from './containers/CompanyDetailView';
import PositionList from './containers/PositionListView';
import PositionDetail from './containers/PositionDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ProfilePage from './containers/ProfilePage';
import EditProfilePage from './containers/ProfilePageEdit';
import CompanySearchResults from './containers/CompanySearchResults';
import PositionSearchResults from './containers/PositionSearchResults';

import ApplicantsList from './containers/ApplicantsList'
import ApplicantsSearchResults from './containers/ApplicantsSearchResults';

const BaseRouter = () => (
	<div>
		<Route exact path='/' component={CompanyList} />
		<Route exact path='/companyscreate/' component={CompanyCreate} />
		<Route exact path='/companys/:companySlug/' component={CompanyDetail} />
		<Route exact path='/positions' component={PositionList} />
		<Route exact path='/positions/:positionID/' component={PositionDetail} />
		<Route exact path='/login/' component={Login} />
		<Route exact path='/signup/' component={Signup} />
		<Route exact path='/profile/' component={ProfilePage} />
		<Route exact path='/profile/edit/' component={EditProfilePage} />
		<Route exact path='/companys/search/:search/' component={CompanySearchResults} />
		<Route exact path='/positions/search/:search/' component={PositionSearchResults} />
		<Route exact path='/applicants/' component={ApplicantsList} />
		<Route exact path='/applicants/search/:search/' component={ApplicantsSearchResults} />
	</div>
);

export default BaseRouter;
