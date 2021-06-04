import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Inicio from '../telas/Inicio';
import Jogo from '../telas/Jogo';
import Resultado from '../telas/Resultado';

const Routes = () => (
  <Router>
    <Scene>
      <Scene key='inicio' component={Inicio} title='Inicio' initial hideNavBar />
      <Scene key='jogo' component={Jogo} title='Jogo' hideNavBar />
      <Scene key='resultado' component={Resultado} title='Resultado' hideNavBar />
    </Scene>
  </Router>  
);

export default Routes;
