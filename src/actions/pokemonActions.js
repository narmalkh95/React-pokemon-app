import {getPokemonListApi} from "../api/pokemon.api";
import {POKEMON} from "./_actionTypes";
import {defaultErrorMsg, messageType, showMessage} from "../services/utilities";

export const getPokemonList = (offset = 1, limit = 100) => dispatch => {
    return getPokemonListApi(offset, limit)
        .then(res => {
            if (res?.results) {
                dispatch({
                    type: POKEMON.ADD,
                    payload: res.results
                });
                return true
            }
            return false
        })
        .catch(err => {
            console.log("Error", err);
            showMessage(messageType.error, defaultErrorMsg)
            return false;
        })
}