import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

export default class telaNomeUsuario extends Component {
    state={
        nome: '',
        nomeGet: ''
    }

    async salvarNome() {
        try {
            await AsyncStorage.setItem('nome', this.state.nome);
        } catch (error) {
            console.log('\n\n\n\n\nErro: ', error);
        }
        await Actions.telainicio();        
    }
    

    render() {
        return (
            <View>
                <Text style={styles.txt}>Digite seu Nome</Text>
                <Text style={styles.txt}>{this.state.nomeGet}</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(text) => this.setState({ nome: text })}
                />
                <TouchableOpacity onPress={() => { this.salvarNome(); }}>
                    <View style={styles.botao}>
                        <Text style={styles.txtBotao}>Salvar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    txt: {
        fontSize: 25,
        textAlign: 'center',
        padding: 5,
        margin: 10
    },
    input: {
        fontSize: 30,
        height: 60,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 5,
        margin: 10
    },
    botao: {
        height: 50,
        backgroundColor: '#3CB371',
        padding: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBotao: {
        fontSize: 25,
        color: '#fff'
    }
});
