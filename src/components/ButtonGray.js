// Importação
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import { useState } from 'react'

// Definição
const ButtonGray = (props) => {
    return(
            <TouchableOpacity style={estilos.touchable} onPress={props.func}>
                <Text style={estilos.touchable.text}>{props.texto}</Text>
            </TouchableOpacity>
    )
}

const estilos = StyleSheet.create({
    touchable: {
        alignItems: 'center',
        alignSelf: 'center',
        text: {
            fontFamily: 'AveriaLibre-Regular',
            color: 'white',
            fontSize: 24,
        },
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#B5C7D1',
        padding: 10,
        marginVertical: 20,
        width: '70%'
      }
    })

export default ButtonGray