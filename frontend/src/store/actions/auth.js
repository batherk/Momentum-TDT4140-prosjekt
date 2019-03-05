import axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
}

export const authSuccess = (token, id, role) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		id: id,
		role: role
	};
}

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
}

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('id');
	localStorage.removeItem('role');
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
	const { token, id} = res.data;
	// const id = res.data.id;

	// En time i fremtiden
	const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

	localStorage.setItem('token', token);
	localStorage.setItem('id', JSON.stringify(id));
	localStorage.setItem('expirationDate', expirationDate);
	dispatch(authSuccess(token, id));

	// Logger deg ut etter 3600 sekunder
	dispatch(checkAuthTimeout(3600));
}

const storeProfile  = (profile) => {
	localStorage.setItem('profile', JSON.stringify(profile));
	return {
		type: actionTypes.STORE_PROFILE,
		profile: profile
	}
}

const getProfile = (dispatch, token, id) => {
	axios.get(`http://localhost:8000/api/profile/${id}/`, {
		headers: { Authorization : 'Token ' + token }
	})
	.then(res => {
		console.log('profile', res);
		dispatch(storeProfile(res.data));
	})
	.catch(err => {
		dispatch(authFail(err))
	});
}

export const authLogin = (email, password) => {
	return dispatch => {
		dispatch(authStart());
		axios.post('http://127.0.0.1:8000/api/login/', {
			username: email, 	// TODO: endre til email når det er endret på backend
			password: password
		})
		.then((res) => {
			console.log('Done with login: ', res);
			storeUserData(dispatch, res);
			const { token, id } = res.data;
			getProfile(dispatch, token, id);
		})
		.catch((err) => {
			dispatch(authFail(err));
		});
	}
}

// Add type later (startup, user, investor)
export const authSignup = (firstName, lastName, email, password, role) => {
	return dispatch => {
		dispatch(authStart());
		axios.post('http://127.0.0.1:8000/api/register/', {
			first_name: firstName,
			last_name: lastName,
			email: email, 
			password: password,
			role: role
		})
		.then((res) => {
			// console.log('registerd', res);
			// storeUserData(dispatch, res);
			dispatch(authLogin(email, password));
		})
		.catch((err) => {
			dispatch(authFail(err));
		});
	}
}

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		const id = parseInt(localStorage.getItem('id'));
		const profile = JSON.parse(localStorage.getItem('profile'));
		if (token === undefined) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));

			// Log out if the expiration date has run out
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(token, id));
				dispatch(storeProfile(profile));
				dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
			}
		}
	}
}