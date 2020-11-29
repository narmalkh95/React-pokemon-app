import React, {useState} from 'react';
import '../../styles/home.scss'
import InfinityScrollHook from "../../helpers/InfinitScroll.Component";
import {useDispatch, useSelector} from "react-redux";
import {getPokemonList} from "../../actions/pokemonActions";
import Paths from "../../enums/Paths";
import pokemonTypes from '../../enums/pokemonTypes';
import {Button} from 'antd';

const HomeComponent = (props) => {
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.pokemon);
    const [selectedType, setSelectedType] = useState('');

    //use offset from state to not get data from start after coming back from pokemon info page.
    const handleBottomScroll = () => dispatch(getPokemonList(pokemon.offset));

    return (
        <div className={'container pokemonContainer'}>
            <h4>Pokemon List</h4>
            <div className="row">
                <div className={'typesDivTop'}>
                    <p>Filter By Type</p>
                    {pokemonTypes.map(type => (
                        <Button
                            key={type}
                            className={type}
                            onClick={() => setSelectedType(type)}
                        >
                            {type}
                        </Button>
                    ))}
                    <Button
                        onClick={() => setSelectedType('')}
                    >
                        All Types
                    </Button>
                </div>
            </div>
            <InfinityScrollHook onBottom = {handleBottomScroll} initialData={pokemon.data.length}>
                {pokemon.data.map(item => {
                    if (selectedType && !item.types.find(item => item.type.name === selectedType)) return null;
                    const {front_default, front_shiny} = item.sprites;

                    return (
                        (
                            <div
                                key={item.id}
                                className={'pokemonListItem'}
                                onClick={ () => {
                                    props.history.push(Paths.pokemonInfo.replace(':pokemonId', item.id))
                                }}
                            >
                                <div>
                                    <img
                                        src={front_default || front_shiny}
                                        alt={'pokemonImage'}
                                    />
                                    <p>{item.name}</p>
                                </div>
                                <div>
                                    <div className={'typesDiv'}>
                                        {item.types.map(typesObj => {
                                            const name = typesObj.type.name;
                                            return <span className={name} key={name}>{name}</span>
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    )
                })}
            </InfinityScrollHook>
        </div>
    )
};

export default HomeComponent;