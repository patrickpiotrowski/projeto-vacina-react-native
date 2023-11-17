// Importação
import { View, Text, StyleSheet, TextInput, LeftContent, Button, TouchableOpacity, StatusBar, Image, ImageBackground } from 'react-native'
import { Fragment, useState } from 'react'

// Definição
const LineAll = (props) => {
    return (
        <View style={estilos.todo}>
            <View style={estilos.linha1}>
                <View style={estilos.caixaText}>
                    <Text style={estilos.text}>{props.label} </Text>
                </View>

                <View style={estilos.caixaInput}>
                    <TextInput style={estilos.textInput} placeholder={props.placeholder}
                        onChangeText={props.func} value={props.value} secureTextEntry={props.seguro}
                    />
                </View>
            </View>
        </View>

    )
}


const estilos = StyleSheet.create({
    todo: {
        flex: 1
    },
    linha1: {
        flex: 1,
        flexDirection: 'row',
        margin: 10

    },
    text: {
        fontFamily: 'AveriaLibre-Regular',
        color: 'white',
        fontSize: 20,
    },
    textInput: {
        fontFamily: 'AveriaLibre-Regular',
        backgroundColor: 'white',
        width: '100%',
        fontSize: 20,
        padding: 4,
    },
    caixaInput: {
        flex: 7,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    caixaText: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
})


export default LineAll