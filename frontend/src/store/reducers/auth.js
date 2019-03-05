import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INITIAL_STATE = {
	token: null,
	id: null,
	error: null, 
	loading: false,
	profile: null
};

const authStart = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: true
	});
}

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.token,
		id: action.id,
		error: null, 
		loading: false
	});
}

const authFail = (state, action) => {
	return updateObject(state,  {
		// token: null,
		error: action.error,
		loading: false
	});
}

const authLogout = (state, action) => {
	return updateObject(state, {
		token: null,
		id: null,
		profile: null
	});
}

const storeProfile = (state, action) => {
	return updateObject(state, {
		profile: action.profile
	});
}

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START: return authStart(state, action);
		case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
		case actionTypes.AUTH_FAIL: return authFail(state, action);
		case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
		case actionTypes.STORE_PROFILE: return storeProfile(state, action);
		default: return state;
	}
}

export default reducer;