import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import telaInicio from './TelaInicio';
// eslint-disable-next-line import/no-named-as-default
import telaNomeUsuario from './TelaNomeUsuario';
import telaNovaTarefa from './TelaNovaTarefa';
import TelaUpdate from './TelaUpdate';

const Routes = () => (
    <Router>
        <Scene>
            <Scene key='telainicio' component={telaInicio} initial hideNavBar />
            <Scene key='telanome' component={telaNomeUsuario} hideNavBar />
            <Scene key='telatarefa' component={telaNovaTarefa} hideNavBar />
            <Scene key='telaupdate' component={TelaUpdate} hideNavBar />
        </Scene>
    </Router>
);

export default Routes;

