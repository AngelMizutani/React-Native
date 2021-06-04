import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const img = require('../img/jokenpo.jpg');

export default class Inicio extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.titulo}>JOKENPO</Text>
                <Image source={img}
                       style={{ width: 360, height: 240 }} />
                <TouchableOpacity style={styles.botao}
                                  onPress={() => { Actions.jogo(); }}
                >
                    <Text style={styles.txtBotao}>Jogar!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 40, 
        color: 'blue', 
        textAlign: 'center', 
        margin: 10,
    },
    botao: {
        height: 80,
        backgroundColor: 'blue',
        padding: 5,
        marginTop: 50,
        margin: 5,
    },
    txtBotao: {
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    }
});