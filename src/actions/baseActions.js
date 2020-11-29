import {LOADING} from "./_actionTypes";

export const showLoader = (state = true) => dispatch => {
	if (state) {
		dispatch({type: LOADING.START_LOADING})
	} else {
		dispatch({type: LOADING.STOP_LOADING})
	}
};