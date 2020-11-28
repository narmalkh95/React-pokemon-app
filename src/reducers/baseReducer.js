import {LOADING} from "../actions/_actionTypes";
import initialState from '../store/_initialState';

export const loadingReducer = (state = initialState.loading, action) => {
	switch (action.type) {
		case LOADING.START_LOADING:
			return true;
		case LOADING.STOP_LOADING:
			return false;
		default:
			return state;
	}
};