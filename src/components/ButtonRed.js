// Importação
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useState } from 'react'

const trashicon = require('../assets/images/trash.png');

// Definição
const ButtonRed = (props) => {
    return (
        <View>
            {
                props.boolean ?
                    <TouchableOpacity style={estilos.touchable}>
                        <ActivityIndicator size="large" color="#FFFFFF"></ActivityIndicator>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={estilos.touchable} onPress={props.func}>
                        <View style={estilos.touchable.view}>
                            <Image source={trashicon} style={estilos.touchable.view.icon} />
                            <Text style={estilos.touchable.view.text}>{props.texto}</Text>
                        </View>
                    </TouchableOpacity>
            }
        </View>
    )
}

const estilos = StyleSheet.create({

    touchable: {
        alignItems: 'center',
        alignSelf: 'center',
        view: {
            flexDirection: 'row',
            alignItems: 'center',
            icon: {
                width: 30,
                height: 30,
                marginRight: 10
            },
            text: {
                fontFamily: 'AveriaLibre-Regular',
                color: 'white',
                fontSize: 28,
            },
        },
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FD7979',
        padding: 10,
        marginVertical: 10,
        width: '50%',
    }
})

export default ButtonRed