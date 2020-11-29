import Paths from "../../enums/Paths";
import {useParams} from "react-router-dom";
import {messageType, showMessage} from "../../services/utilities";
import {useSelector} from "react-redux";
import React from "react";
import '../../styles/pokemonInfo.scss';
import {Progress} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';

const PokemonInfoComponent = (props) => {
    const {pokemonId} = useParams();
    const pokemonList = useSelector(state => state.pokemon.data);

    const currentPokemon = pokemonList.find(pokemon => pokemon.id === Number(pokemonId));

    if (!currentPokemon) {
        showMessage(messageType.error, 'Pokemon not found.');
        props.history.push(Paths.home);
        return null
    }

    const {name, abilities, stats, types, sprites} = currentPokemon;
    const {front_default, front_shiny} = sprites;

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
                                const {base_stat, stat} = item;

                                return (
                                    <div>
                                        <p>{stat.name}</p>
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