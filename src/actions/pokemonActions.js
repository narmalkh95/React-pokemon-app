import {getCurrentPokemonData, getPokemonListApi, getPokemonListByTypeApi} from "../api/pokemon.api";
import {POKEMON} from "./_actionTypes";
import {defaultErrorMsg, getIdFromUrl, messageType, showMessage} from "../services/utilities";
import {showLoader} from "./baseActions";

export const getPokemonList = (offset = 0, limit = 10) => dispatch => {
    dispatch(showLoader());
    return getPokemonListApi(offset * limit, limit)
        .then(async (res) => {
            if (res?.results) {
                //We have to get pokemon one by one to have types and additional info to show on homepage.
                //Or we can have just list of pokemon names with unique url to get single pokemon.
                const pokemonDataList = await Promise.all(
                    res.results.map(async pokemon => {
                        const res = await getCurrentPokemonData(getIdFromUrl(pokemon.url));
                        if (res?.id) {
                            const {id, name, abilities, stats, types, sprites} = res;

                            //Get values that will be used.
                            return {id, name, abilities, stats, types, sprites};
                        }
                        //else undefined will be returned to an array
                    })
                )

                dispatch({
                    type: POKEMON.ADD,
                    payload: pokemonDataList.filter(item => item !== undefined)
                });

                dispatch({type: POKEMON.INCREMENT_OFFSET});

                return pokemonDataList.length;
            }
            return false
        })
        .catch(err => {
            console.log("Error", err);
            showMessage(messageType.error, defaultErrorMsg)
            return false;
        })
        .finally(() => {
            dispatch(showLoader(false));
        })
}

export const getPokemonListByType = (type) => dispatch => {
    dispatch(showLoader());
    return getPokemonListByTypeApi(type)
        .then(res => {
            if (res?.pokemon.length) {
                dispatch({
                    type: POKEMON.ADD_POKEMON_TYPE,
                    payload: {
                        type: type,
                        data: res.pokemon
                    }
                })
                return res.pokemon
            }
        })
        .finally(() => dispatch(showLoader(false)));
}