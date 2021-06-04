import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'tarefas.db' });

export default class telaNovaTarefa extends Component {
    state={
        tarefa: this.props.tarefa
    }

    componentDidMount() {
        console.log('\n\n\n\n\n\n\n');
        console.log('Id: ', this.props.id);
        console.log('Tarefa: ', this.props.tarefa);
        console.log('\n\n\n\n\n\n\n');
    }

    async editarTarefa() {
        await db.transaction(tx => {
            tx.executeSql('UPDATE tarefas SET tarefa=? WHERE id=?', 
            [this.state.tarefa, this.props.id],
            (tx, results) => {
                console.log('\n\n\n\n\n\n');
                console.log(' Resultado: ', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    ToastAndroid.show('Tarefa alterada com sucesso!', ToastAndroid.LONG);
                }
            });
        });

        await Actions.telainicio();
    }

    render() {
        return (
            <View>
                <Text style={styles.txt}>Alterar a Tarefa:</Text>
                <TextInput
                    value={this.state.tarefa}
                    onChangeText={(text) => this.setState({ tarefa: text })}
                    multiline
                    textAlignVertical='top'
                    numberOfLines={5}
                    style={styles.input}
                />
                <View style={styles.containerBotoes}>
                    <TouchableOpacity 
                        style={styles.botoes}
                        onPress={() => this.editarTarefa()}
                    >
                        <Text style={styles.txtBotao}>Salvar</Text>
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
