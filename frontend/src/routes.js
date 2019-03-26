import React from 'react';
import { Route } from 'react-router-dom';

import Login from './containers/Login';
import Signup from './containers/Signup';

import CompanyList from './containers/CompanyListView';
import CompanyCreate from './containers/CompanyCreateView';
import CompanyDetail from './containers/CompanyDetailView';
import CompanySearchResults from './containers/CompanySearchResults';

import PositionList from './containers/PositionListView';
import PositionCreate from './containers/PositionCreateView';
import PositionDetail from './containers/PositionDetailView';
import PositionSearchResults from './containers/PositionSearchResults';

import ProfilePage from './containers/ProfilePage';
import EditProfilePage from './containers/ProfilePageEdit';

import ApplicantsList from './containers/ApplicantsList'
import ApplicantsSearchResults from './containers/ApplicantsSearchResults';
import MyApplications from "./containers/MyApplications";

const BaseRouter = () => (
	<div>
		<Route exact path='/login/' component={Login} />
		<Route exact path='/signup/' component={Signup} />

		<Route exact path='/' component={CompanyList} />
		<Route exact path='/companyscreate/' component={CompanyCreate} />
		<Route exact path='/companys/:companySlug/' component={CompanyDetail} />
		<Route exact path='/companys/search/:search/' component={CompanySearchResults} />

		<Route exact path='/positions' component={PositionList} />
		<Route exact path='/positionscreate/:companySlug/' component={PositionCreate} />
		<Route exact path='/positions/:positionID/' component={PositionDetail} />
		<Route exact path='/positions/search/:search/' component={PositionSearchResults} />

		<Route exact path='/profile/' component={ProfilePage} />
		<Route exact path='/profile/edit/' component={EditProfilePage} />

		
		<Route exact path='/applicants/' component={ApplicantsList} />
		<Route exact path='/myapplications/' component={MyApplications} />
		<Route exact path='/applicants/search/:search/' component={ApplicantsSearchResults} />
	</div>
);

export default BaseRouter;
