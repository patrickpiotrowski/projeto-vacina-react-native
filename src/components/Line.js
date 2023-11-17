// Importação
import { View, Text, StyleSheet, TextInput, LeftContent, Button, TouchableOpacity, StatusBar, Image, ImageBackground } from 'react-native'
import { Fragment, useState } from 'react'
import ButtonGreen from '../components/ButtonGreen';
import { Card } from 'react-native-paper';

// Definição
const Line = (props) => {
    return (
            <View style={estilos.linha1}>
                <View style={estilos.caixaText}>
                    <Text style={estilos.text}>{props.label} </Text>
                </View>

                <View style={estilos.caixaInput}>
                    <TextInput style={estilos.textInput} placeholder={props.placeholder}
                    onChangeText={props.func} value={props.value}
                    />
                </View>
            </View>
    )
}


const estilos = StyleSheet.create({
    linha1: {
        flex: 1,
        flexDirection: 'row',
        margin: 10

    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    textInput: {
        backgroundColor: 'white',
        width: '100%'
    },
    caixaInput: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    caixaText: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
})


export default Line