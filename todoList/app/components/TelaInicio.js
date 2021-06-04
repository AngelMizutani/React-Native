import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import SQLite from 'react-native-sqlite-storage';

const imgEdit = require('./imgs/editar.png');
const imgExcluir = require('./imgs/delete.png');

const db = SQLite.openDatabase({ name: 'tarefas.db' });

export default class TelaInicio extends Component {

    state = {
        nome: '',
        flatListItems: [],
    }
        

    async componentDidMount() {
        await this.getNome();
        await this.carregarLista();
    }

    async getNome() {
        try {
            const nome = await AsyncStorage.getItem('nome');
            if (nome !== null) {
                this.setState({ nome });
            } else {
                this.setState({ nome: 'Usuário' });
            }
        } catch (error) {
            console.log('\n\n\n\n\n');
            console.log('Erro: ', error);
        }
    }

    async carregarLista() {
        await db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' +
                'tarefas(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                         'tarefa VARCHAR(1000))', []); 
            tx.executeSql('SELECT * FROM tarefas', [],
            (tx, results) => {
                const lista = [];
                for (let i = 0; i < results.rows.length; i++) {
                    lista.push(results.rows.item(i));
                }
                this.setState({ flatListItems: lista });
            });
        });
    }
    
    async deletarTarefas() {
        const id = this.state.id;
        await db.transaction(tx => {
            tx.executeSql('DELETE FROM tarefas WHERE id = (?)', [id]);
        });
        await this.carregarLista();
    }

    renderSeparator = () => {
        return (
            <View style={{ height: 2,
                           width: '100%',
                           backgroundColor: '#CED0CE',
                        }}
            />
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.txtUsuario}>Olá, {this.state.nome}</Text>
                    <TouchableOpacity 
                        onPress={() => { Actions.telanome(); }}
                        style={styles.btnUsuario}    
                    >
                        <Image source={imgEdit} style={{ height: 50, width: 50 }} />
                    </TouchableOpacity>
                    
                </View>
                <View style={{ flex: 8, padding: 10 }}>
                    <FlatList 
                          data={this.state.flatListItems}
                          keyExtractor={item => item.id.toString()}
                          ItemSeparatorComponent={this.renderSeparator}
                          renderItem={({ item }) => (
                                <View style={styles.containerLista}>
                                    <Text 
                                        style={styles.txtLista}
                                    >
                                        {item.tarefa}
                                    </Text>
                                    <View style={styles.containerBotao}>
                                        <TouchableOpacity
                                            onPress={async () => { 
                                                await this.setState({
                                                    id: item.id,
                                                    tarefa: item.tarefa
                                                });
                                                await Actions.telaupdate({
                                                    id: this.state.id,
                                                    tarefa: this.state.tarefa
                                                }); 
                                            }}
                                        >
                                            <Image 
                                                source={imgEdit} 
                                                style={styles.imagemBotao}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                await this.setState({ id: item.id });
                                                await this.deletarTarefas();
                                            }}
                                        >
                                            <Image 
                                                source={imgExcluir} 
                                                style={styles.imagemBotao}
                                            />
                                        </TouchableOpacity>
                                    </View>    
                                </View>
                              )}
                    />
                </View>
                <View style={{ flex: 1, marginBottom: 10 }}>
                    <TouchableOpacity 
                        style={styles.btnNova}
                        onPress={() => Actions.telatarefa()}
                    >
                        <Text style={styles.txtBotao}>Adicionar Tarefa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'stretch',
        margin: 10,
        flex: 1
    },
    txtUsuario: {
        fontSize: 25,
        margin: 10
    },
    btnUsuario: {
        justifyContent: 'center',
        padding: 5,
    },
    containerLista: {
        marginVertical: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    txtLista: {
        fontSize: 20, 
        flex: 8,
        marginRight: 5
    },
    containerBotao: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 2
    },
    botoesLista: {
        padding: 2
    },
    imagemBotao: {
        height: 25,
        width: 25,
    },
    txtBotao: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff'
    },
    btnNova: {
        backgroundColor: '#87CEFA',
        height: 50,
        padding: 5,
        margin: 10,
    }
});
