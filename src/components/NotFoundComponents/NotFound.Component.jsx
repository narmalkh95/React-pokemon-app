import React from 'react';
import pokemonCircleImg from '../../imgs/pokemonCircle.png';
import {Link} from 'react-router-dom'
import Paths from "../../enums/Paths";

const PageNotFound = () => (
  <div className={'notFound'}>
      <div>
          <span>4</span>
          <img src={pokemonCircleImg} alt='' />
          <span>4</span>
      </div>
      <p>The page you are looking for can't be found. Go home by <Link to={Paths.home}>Clicking Here!</Link></p>
  </div>
);

export default PageNotFound;
