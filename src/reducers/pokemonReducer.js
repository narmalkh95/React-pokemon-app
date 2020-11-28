import initialState from "../store/_initialState";
import {POKEMON} from "../actions/_actionTypes";

export const pokemonReducer = (state = initialState.pokemon, action) => {
    switch (action.type) {
        case POKEMON.ADD:
            return {...state, data: [...state.data, ...action.payload]}
        case POKEMON.REMOVE:
            return {...state, data: []};
        default:
            return state;
    }
};