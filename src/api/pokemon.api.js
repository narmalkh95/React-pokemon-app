import {Get, HandleResponseState} from "../services/Http.Client";

export const getPokemonListApi = (offset, limit) =>
    Get(`pokemon?limit=${limit}&offset=${offset}`)
        .then(HandleResponseState)