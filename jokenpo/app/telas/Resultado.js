import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const pedra = require('../img/pedra.png');
const papel = require('../img/papel.png');
const tesoura = require('../img/tesoura.png');
const triste = require('../img/triste.png');
const perdeu = require('../img/gameover.png');
const ganhou = require('../img/trofeu.png');
const feliz = require('../img/feliz.png');
const empate = require('../img/empate.png');

export default class Resultado extends Component {

    state={
        imgJogador: pedra,
        imgPc: pedra,
        imgResultado: perdeu,
        imgCarinha: triste,
        txtResultado: 'Empate',
        cor: 'green',
    }

    async componentWillMount() {
        await this.setJogador(); 
        await this.setPc();
        await this.setResultado();
    }
    
    setJogador() {
        switch (this.props.jogador) {
            case 'pedra':
                this.setState({ imgJogador: pedra });
                break;
                
            case 'papel':
                this.setState({ imgJogador: papel });
                break;
                
            case 'tesoura':
                this.setState({ imgJogador: tesoura });
                break;

            default:
                break;
        }
    }

    setPc() {
        switch (this.props.pc) {
            case 'pedra':
                this.setState({ imgPc: pedra });
                break;
                    
            case 'papel':
                this.setState({ imgPc: papel });
                break;
                            
            case 'tesoura':
                this.setState({ imgPc: tesoura });
                break;
        
            default:
                break;
        }
    }

    setResultado() {
        switch (this.props.resultado) {
            case 'ganhou':
                this.setState({ imgResultado: ganhou, imgCarinha: feliz, txtResultado: 'Ganhou!!', cor: 'green' });
                break;
                    
            case 'perdeu':
                this.setState({ imgResultado: perdeu, imgCarinha: triste, txtResultado: 'Perdeu', cor: 'red' });
                break;
                
            case 'empate':
                this.setState({ imgResultado: empate, imgCarinha: feliz, txtResultado: 'Empate', cor: 'blue' });
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <View style={styles.container}>
                        <Image 
                            source={this.state.imgJogador} 
                            style={styles.imagem}
                        />
                        <Text style={styles.txtJogador} >Jogador</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>X</Text>
                    </View>
                    <View style={styles.container}>
                        <Image 
                            source={this.state.imgPc}
                            style={styles.imagem}
                        />
                        <Text style={styles.txtJogador} >PC</Text>
                    </View>
                </View>
                <View style={styles.resultado}> 
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={this.state.imgResultado}
                            style={styles.imgResultado}
                        />
                        <Image
                            source={this.state.imgCarinha}
                            style={styles.imgCarinha}
                        /> 
                    </View>
                    <Text style={[styles.txtResultado, { color: this.state.cor }]}>{this.state.txtResultado}</Text>
                </View>

                <TouchableOpacity 
                    style={styles.botao}
                    onPress={() => { Actions.jogo(); }}
                >
                    <Text style={styles.txtBotao}>Jogar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 5,
    },
    imagem: {
        height: 120,
        width: 120,
    },
    txtJogador: {
        fontSize: 25,
        textAlign: 'center',
    },
    resultado: {
        margin: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgResultado: {
        height: 150,
        width: 150,
    },
    imgCarinha: {
        height: 80,
        width: 80,
    },
    txtResultado: {
        fontSize: 70,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    botao: {
        height: 80,
        backgroundColor: 'orange',
        padding: 5,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    txtBotao: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    }
});
