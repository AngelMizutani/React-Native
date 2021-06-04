
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Inicio from './app/telas/Inicio';
import Jogo from './app/telas/Jogo';
import Resultado from './app/telas/Resultado';
import Routes from './app/component/Routes';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      // <Inicio />
      // <Jogo />
      // <Resultado />
      <Routes />
    );
  }
}

