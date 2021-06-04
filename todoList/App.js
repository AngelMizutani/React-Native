import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Routes from './app/components/routes';
import TelaInicio from './app/components/TelaInicio';
import TelaNomeUsuario from './app/components/TelaNomeUsuario';
import TelaNovaTarefa from './app/components/TelaNovaTarefa';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Routes />
      //<TelaInicio />
      // <TelaNomeUsuario />
      //<TelaNovaTarefa />
    );
  }
}

