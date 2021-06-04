import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'tarefas.db' });

export default class telaNovaTarefa extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tarefa: ''
        };
    }

    salvarTarefa() {
        const tarefa = this.state.tarefa;

        db.transaction(tx => {
            tx.executeSql('INSERT INTO tarefas (tarefa) VALUES (?)', [tarefa],
            (tx, results) => {
                console.log('\n\n\n\n\n\n');
                console.log(' Resultado: ', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    ToastAndroid.show('Tarefa salva com sucesso!', ToastAndroid.LONG);
                }
            });
        });
        this.setState({ tarefa: '' });
    }

    render() {
        return (
            <View>
                <Text style={styles.txt}>Digite a Tarefa:</Text>
                <TextInput
                    onChangeText={(text) => this.setState({ tarefa: text })}
                    multiline
                    textAlignVertical='top'
                    numberOfLines={5}
                    style={styles.input}
                    value={this.state.tarefa}
                />
                <View style={styles.containerBotoes}>
                    <TouchableOpacity 
                        style={styles.botoes}
                        onPress={() => this.salvarTarefa()}
                    >
                        <Text style={styles.txtBotao}>Salvar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.botoes}
                        onPress={() => Actions.telainicio()}
                    
                    >
                        <Text style={styles.txtBotao}>Voltar</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    txt: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        padding: 5
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        margin: 10,
        padding: 5,
        fontSize: 20
    },
    containerBotoes: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
        padding: 10
    },
    botoes: {
        height: 50,
        width: 80,
        backgroundColor: '#87CEFA',
        padding: 5,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtBotao: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
});
