import axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
}

export const authSuccess = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token
	};
}

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
}

export const logout = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('expirationDate');
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000)
	}
}

const storeUserData = (dispatch, res) => {
	const token = res.data.token;

	// En time i fremtiden
	const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

	localStorage.setItem('token', token);
	localStorage.setItem('expirationDate', expirationDate);
	dispatch(authSuccess(token));

	// Logger deg ut etter 3600 sekunder
	dispatch(checkAuthTimeout(3600));
}

export const authLogin = (email, password) => {
	return dispatch => {
		dispatch(authStart());
		axios.post('http://127.0.0.1:8000/api/login', {
			username: email, 	// TODO: endre til email når det er endret på backend
			password: password
		})
		.then((res) => {
			console.log('Done with login: ', res);
			storeUserData(dispatch, res);
		})
		.catch((err) => {
			dispatch(authFail(err));
		});
	}
}

// Add type later (startup, user, investor)
export const authSignup = (username, email, password1, password2) => {
	return dispatch => {
		dispatch(authStart());
		axios.post('http://127.0.0.1:8000/rest-auth/login/', {
			username: username,
			email: email, 
			password1: password1, 
			password2: password2
		})
		.then((res) => {
			storeUserData(dispatch, res);
		})
		.catch((err) => {
			dispatch(authFail(err));
		});
	}
}

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (token === undefined) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));

			// Log out if the expiration date has run out
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
			}
		}
	}
}