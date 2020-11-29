import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Paths from "../enums/Paths";
import HomeComponent from "./HomeComponents/HomeComponent";
import PageNotFound from "./NotFoundComponents/NotFound.Component";
import PokemonInfoComponent from "./PokemonInfoComponent/PokemonInfoComponent";

const MainRouters = () => {

	return (
		<Switch>
			<Route exact path={Paths.home} component={HomeComponent}/>
			<Route exact path={Paths.pokemonInfo} component={PokemonInfoComponent}/>
			<Route component={PageNotFound}/>
		</Switch>
	);
};

export default MainRouters;
