import React from 'react';
import InfinityScrollHook from "../../helpers/InfinitScroll.Component";
import {useDispatch, useSelector} from "react-redux";
import {getPokemonList} from "../../actions/pokemonActions";

const HomeComponent = () => {
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.pokemon);

    const handleBottomScroll = (offset) => dispatch(getPokemonList(offset));

    return (
        <div className={'container'}>
            <h1>Pokemon List</h1>
            <InfinityScrollHook onBottom = {handleBottomScroll}>
                {pokemon.data.map(item => (
                    <div>
                        <p>{item.name}</p>
                    </div>
                ))}
            </InfinityScrollHook>
        </div>
    )
};

export default HomeComponent;