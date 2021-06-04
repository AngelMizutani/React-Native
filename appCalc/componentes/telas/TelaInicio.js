import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const imagem = require('../imgs/hello-kitty-icon.png');

export default class TelaInicio extends Component {
    state={
        num1: '',
        num2: '',
        operacao: '',
        resultado: ''
    }

    calcular(operacao) {
        let num1 = parseFloat(this.state.num1);
        let num2 = parseFloat(this.state.num2);
        switch (operacao) {
            case '+':
                this.setState({ resultado: (num1 + num2)});
                break;
            
            case '-':
                this.setState({ resultado: (num1 - num2)});
                break;
            
            case 'x':
                this.setState({ resultado: (num1 * num2)});
                break;
                
            case '/':
                this.setState({ resultado: (num1 / num2)});
                break;
                
            default:
                return false;
        };
    }

    limpar() {
        this.setState({ num1: '',
                        num2: '',
                        operacao: '',
                        resultado: ''
                     });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerImagem}>
                    <Image source={imagem} style={{ height: 120, width: 120 }} />
                </View>
                <View style={styles.containerInputs}>
                    <TextInput style={styles.input} 
                               value={this.state.num1}
                               keyboardType='numeric'
                               onChangeText={(text) => this.setState({ num1: text })}
                    />
                    <Text style={styles.txtOperacao}>{this.state.operacao}</Text>
                    <TextInput style={styles.input} 
                               keyboardType='numeric'
                               value={this.state.num2}
                               onChangeText={(text) => this.setState({ num2: text })}
                    />
                </View>
                <View style={styles.containerButtons}>
                    <TouchableOpacity style={styles.btnOperacao} 
                                      onPress={() => {this.setState({operacao: '+'})}}
                    >
                        <Text style={styles.txtButton}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnOperacao} 
                                      onPress={() => {this.setState({operacao: '-'})}}
                    >
                        <Text style={styles.txtButton}>-</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnOperacao} 
                                      onPress={() => {this.setState({operacao: 'x'})}}
                    >
                        <Text style={styles.txtButton}>X</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.btnOperacao} 
                                      onPress={() => {this.setState({operacao: '/'})}}
                    >
                        <Text style={styles.txtButton}>/</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerButtonResultado}>
                    <TouchableOpacity style={[styles.button, {flex: 2}]} 
                                      onPress={() => {this.calcular(this.state.operacao)}}
                    >
                        <Text style={styles.txtButton}>=</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {flex: 1}]} 
                                      onPress={() => {this.limpar()}}
                    >
                        <Text style={[styles.txtButton, {fontSize: 24}]}>Limpar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerResultado}>
                    <Text style={styles.txtResultado}>{this.state.resultado}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#ffb3db'
},
containerImagem: {
    justifyContent: 'center',
    alignItems: 'center'
},
containerInputs: {
    justifyContent: 'center',
    alignItems: 'stretch',
},
input: {
    height: 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff1493',
    fontSize: 30,
    margin: 5
},
txtOperacao: {
    height: 60,
    width: 80,
    fontSize: 40,
    borderWidth: 1,
    borderColor: '#ff1493',
    fontWeight: 'bold',
    alignSelf: 'center',
    backgroundColor: '#ffe6f3',
    textAlign: 'center',
    textAlignVertical: 'center'
},
containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5
},
btnOperacao: {
    height: 60,
    width: 80,
    padding: 5,
    borderWidth: 1,
    borderColor: '#cc006d',
    backgroundColor: '#ff1494'
},
containerButtonResultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
},
button: {
    borderWidth: 1,
    borderColor: '#cc006d',
    height: 60,
    backgroundColor: '#ff1a94',
    margin: 5
},
txtButton: {
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold'
},
containerResultado: {
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 5
},
txtResultado: {
    borderColor: '#ff1493',
    borderWidth: 1,
    fontSize: 40,
    fontWeight: 'bold',
    height: 60,
    backgroundColor: '#fff',
    textAlign: 'center'
}
});