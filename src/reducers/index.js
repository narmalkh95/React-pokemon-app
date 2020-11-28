import {combineReducers} from 'redux';
import {loadingReducer} from "./baseReducer";
import {pokemonReducer} from "./pokemonReducer";

const rootReducer = combineReducers({
	loading: loadingReducer,
	pokemon: pokemonReducer
});

export default rootReducer;