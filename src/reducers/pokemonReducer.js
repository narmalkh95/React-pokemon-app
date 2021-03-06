import initialState from "../store/_initialState";
import {POKEMON} from "../actions/_actionTypes";

export const pokemonReducer = (state = initialState.pokemon, action) => {
    switch (action.type) {
        case POKEMON.ADD:
            return {...state, data: [...state.data, ...action.payload]}
        case POKEMON.CLEAR:
            return {...state, data: []};
        case POKEMON.INCREMENT_OFFSET:
            return {...state, offset: state.offset + 1}
        case POKEMON.ADD_POKEMON_TYPE:
            return {
                ...state,
                typesData: {
                    ...state.typesData,
                    [action.payload.type]: action.payload.data
                }
            }

        default:
            return state;
    }
};