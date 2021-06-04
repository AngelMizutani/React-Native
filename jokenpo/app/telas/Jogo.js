import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

/** 
 * Na tela Jogo ocorre a ação principal do app
 * O jogador vai escolher a opcao (Pedra, papel ou tesoura)
 * A opcao do app vai ser feita por meio da classe random
 * Esses dados serão passados para a tela Resultado via props
*/

const pedra = require('../img/pedra.png');
const papel = require('../img/papel.png');
const tesoura = require('../img/tesoura.png');

export default class Jogo extends Component {
    state={
        opcaoPc: '',
        resultado: '',
    }

    async escolherPedra() {
        await this.escolherOpcaoPc();

        if (this.state.opcaoPc === 'pedra') {
            this.setState({ resultado: 'empate' });
        } else if (this.state.opcaoPc === 'papel') {
            this.setState({ resultado: 'perdeu' });
        } else {
            this.setState({ resultado: 'ganhou' });
        }
        await Actions.resultado({
            jogador: this.state.opcao,
            pc: this.state.opcaoPc,
            resultado: this.state.resultado
        });
    }

    async escolherPapel() {
        await this.escolherOpcaoPc();

        if (this.state.opcaoPc === 'pedra') {
            this.setState({ resultado: 'ganhou' });
        } else if (this.state.opcaoPc === 'papel') {
            this.setState({ resultado: 'empate' });
        } else {
            this.setState({ resultado: 'perdeu' });
        }

        await Actions.resultado({
            jogador: this.state.opcao,
            pc: this.state.opcaoPc,
            resultado: this.state.resultado
        });
    }

    async escolherTesoura() {
        await this.escolherOpcaoPc();

        if (this.state.opcaoPc === 'pedra') {
            this.setState({ resultado: 'perdeu' });
        } else if (this.state.opcaoPc === 'papel') {
            this.setState({ resultado: 'ganhou' });
        } else {
            this.setState({ resultado: 'empate' });
        }

        await Actions.resultado({
            jogador: this.state.opcao,
            pc: this.state.opcaoPc,
            resultado: this.state.resultado
        });
    }
    
    escolherOpcaoPc() {
        const random = Math.floor(Math.random() * 3) + 1;

        switch (random) {
            case 1:
                this.setState({ opcaoPc: 'pedra' });
                break;

            case 2: 
                this.setState({ opcaoPc: 'papel' });
                break;
            
            case 3:
                this.setState({ opcaoPc: 'tesoura' });
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.txt}>Escolha</Text>
                <TouchableOpacity 
                    style={styles.botao}
                    onPress={() => {
                        this.setState({ opcao: 'pedra' });
                        this.escolherPedra();
                    }}    
                >
                    <Image 
                        source={pedra}
                        style={styles.imgBotao} 
                    />
                    <Text style={styles.txtBotao}>Pedra</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.botao}
                    onPress={() => {
                        this.setState({ opcao: 'papel' });
                        this.escolherPapel();
                    }} 
                >
                    <Image 
                        source={papel}
                        style={styles.imgBotao} 
                    />
                    <Text style={styles.txtBotao}>Papel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.botao}
                    onPress={() => {
                        this.setState({ opcao: 'tesoura' });
                        this.escolherTesoura();
                    }}     
                >
                    <Image 
                        source={tesoura} 
                        style={styles.imgBotao}
                    />
                    <Text style={styles.txtBotao}>Tesoura</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    txt: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    botao: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },

    imgBotao: {
        height: 100,
    },

    txtBotao: {
        fontSize: 30,
    }
});
