// Importação
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, StatusBar } from 'react-native'
import { useState } from 'react'

// Definição
const ButtonRedNoTrash = (props) => {
    return(
            <TouchableOpacity style={estilos.touchable} onPress={props.func}>
                <View style={estilos.touchable.view}>
                    <Text style={estilos.touchable.view.text}>{props.texto}</Text>
                </View>
            </TouchableOpacity>
    )
}

const estilos = StyleSheet.create({

    touchable: {
        alignItems: 'center',
        alignSelf: 'center',
        margin: 10,
        view:{
            flexDirection: 'row',
            alignItems: 'center',
            text: {
                fontFamily: 'AveriaLibre-Regular',
                color: 'white',
                fontSize: 25,
            },
        },
        justifyContent: 'center',
        backgroundColor: '#FD7979',
        padding: 10,
        marginVertical: 10,
        width: '45%',
      }
    })

export default ButtonRedNoTrash