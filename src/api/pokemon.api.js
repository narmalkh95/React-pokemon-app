import {Get, HandleResponseState} from "../services/Http.Client";

export const getPokemonListApi = (offset, limit) =>
    Get(`pokemon?offset=${offset}&limit=${limit}`)
        .then(HandleResponseState)

export const getCurrentPokemonData = (id) =>
    Get(`pokemon/${id}`)
        .then(HandleResponseState)

export const getPokemonListByTypeApi = type =>
    Get(`type/${type}`)
        .then(HandleResponseState)