import {Get, HandleResponseState} from "../services/Http.Client";

export const getPokemonListApi = (offset, limit) =>
    Get(`pokemon?offset=${offset}&limit=${limit}`)
        .then(HandleResponseState)

export const getCurrentPokemonData = (url) =>
    fetch(url).then(response => response.json())