import React, {useState} from 'react';
import '../../styles/home.scss'
import InfinityScrollHook from "../../helpers/InfinitScroll.Component";
import {useDispatch, useSelector} from "react-redux";
import {getPokemonList, getPokemonListByType} from "../../actions/pokemonActions";
import Paths from "../../enums/Paths";
import pokemonTypes from '../../enums/pokemonTypes';
import {Button} from 'antd';
import {getIdFromUrl} from "../../services/utilities";

const HomeComponent = (props) => {
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.pokemon);
    const [selectedTypeArr, setSelectedTypeArr] = useState([]);

    //use offset from state to not get data from start after coming back from pokemon info page.
    const handleBottomScroll = () => dispatch(getPokemonList(pokemon.offset));

    const handleTypeButtonClick = (type) => {
        if (pokemon.typesData[type]) {
            setSelectedTypeArr(pokemon.typesData[type])
        } else {
            dispatch(getPokemonListByType(type))
                .then(pokemonTypeArr => setSelectedTypeArr(pokemonTypeArr));
        }
    }

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
                            onClick={() => handleTypeButtonClick(type)}
                        >
                            {type}
                        </Button>
                    ))}
                    <Button
                        onClick={() => setSelectedTypeArr([])}
                    >
                        All Types
                    </Button>
                </div>
            </div>
            {selectedTypeArr.length ?
                selectedTypeArr.map(item => {
                        const {url, name} = item.pokemon;

                        return (
                            <div
                                className={'pokemonListItem pokemonTypeList'}
                                key={name}
                                onClick={() => {
                                    props.history.push(Paths.pokemonInfo.replace(':pokemonId', getIdFromUrl(url)))
                                }}
                            >
                                <p>{name}</p>
                            </div>
                        )
                    }
                )
                :
                <InfinityScrollHook onBottom={handleBottomScroll} initialData={pokemon.data.length}>
                    {pokemon.data.map(item => {
                        const {front_default, front_shiny} = item.sprites;

                        return (
                            (
                                <div
                                    key={item.id}
                                    className={'pokemonListItem'}
                                    onClick={() => {
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
            }
        </div>
    )
};

export default HomeComponent;