// Importação
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import { useState } from 'react'

// Definição
const ButtonGreen = (props) => {

    return (
        <View>
            {
                props.boolean ?
                    <TouchableOpacity style={estilos.touchable}>
                        <ActivityIndicator size="large" color="#FFFFFF"></ActivityIndicator>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={estilos.touchable} onPress={props.func}>
                        <Text style={estilos.touchable.text}>{props.texto}</Text>
                    </TouchableOpacity>
            }
        </View>
    )
}

const estilos = StyleSheet.create({
    touchable: {
        alignItems: 'center',
        alignSelf: 'center',
        text: {
            fontFamily: 'AveriaLibre-Regular',
            color: 'white',
            fontSize: 28,
        },
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#37BD6D',
        padding: 10,
        marginVertical: 10,
        width: '70%'
    }
})

export default ButtonGreen