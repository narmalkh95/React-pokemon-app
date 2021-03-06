import Paths from "../../enums/Paths";
import {useParams} from "react-router-dom";
import {messageType, showMessage} from "../../services/utilities";
import {useDispatch, useSelector} from "react-redux";
import React, {useState, useEffect} from "react";
import '../../styles/pokemonInfo.scss';
import {Progress} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {getCurrentPokemonData} from "../../api/pokemon.api";
import {POKEMON} from "../../actions/_actionTypes";
import {showLoader} from "../../actions/baseActions";

const PokemonInfoComponent = (props) => {
    const {pokemonId} = useParams();
    const pokemonList = useSelector(state => state.pokemon.data);
    const [currentPokemon, setCurrentPokemon] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const currentPokemon = pokemonList.find(pokemon => pokemon.id === Number(pokemonId));

        if (currentPokemon) {
            setCurrentPokemon(currentPokemon)
        } else {
            dispatch(showLoader())
            getCurrentPokemonData(pokemonId).then(res => {
                if (res.id) {
                    setCurrentPokemon(res);
                    const {id, name, abilities, stats, types, sprites} = res;
                    dispatch({
                        type: POKEMON.ADD,
                        payload: [{id, name, abilities, stats, types, sprites}]
                    });
                } else {
                    showMessage(messageType.error, 'Pokemon not found.');
                    props.history.push(Paths.home);
                    return null
                }
            }).finally(() => dispatch(showLoader(false)))
        }
    }, [])

    const {name, abilities, stats, types, sprites} = currentPokemon;
    const {front_default, front_shiny} = sprites || {};

    return (
        <div className={'container'}>
            <div className={'pokemonDetailsDiv'}>
                <ArrowLeftOutlined onClick={() => props.history.goBack()}/>
                <div className={'name'}>
                    <img src={front_default || front_shiny} alt={'pokemonImage'}/>
                    <p>{name}</p>
                </div>
                <div className="row">
                    <div className={'mainInfo'}>
                        <div>
                            {abilities?.length && (
                                <div className={'abilities'}>
                                    <p>Abilities</p>
                                    {abilities.map(item => {
                                        const abilityName = item.ability.name;
                                        return <p key={abilityName}>{abilityName}</p>
                                    })}
                                </div>
                            )}

                            {types?.length && (
                                <div className={'types'}>
                                    <p>Types</p>
                                    {types.map(typesObj => {
                                        const type = typesObj.type.name;
                                        return <p key={type}>{type}</p>
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {stats?.length && (
                    <div className="row">
                        <div className={'statsDiv'}>
                            <p>Stats</p>
                            {stats.map(item => {
                                const {base_stat, stat: {name}} = item;

                                return (
                                    <div key={name}>
                                        <p>{name}</p>
                                        <Progress percent={base_stat}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default PokemonInfoComponent;