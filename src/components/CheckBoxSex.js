// Importação
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Button, Image, ImageBackground } from 'react-native'
import { RadioButton } from 'react-native-paper';
import { useState } from 'react';

// Definição
const CheckBoxSex = (props) => {
    return (
        <View style={estilos.todo}>
            <View style={estilos.linha1}>
                <View style={estilos.caixaText}>
                    <Text style={estilos.textLabel}>{props.label} </Text>
                </View>

                <View style={estilos.caixaInput}>
                    <RadioButton value="m"
                        status={props.param === 'm' ? 'checked' : 'unchecked'}
                        onPress={props.funcm} />
                    <Text style={estilos.text}>Masculino</Text>
                    <RadioButton value="f"
                        status={props.param === 'f' ? 'checked' : 'unchecked'}
                        onPress={props.funcf} />
                    <Text style={estilos.text}>Feminino</Text>
                </View>
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    todo: {
        flex: 1,
    },
    linha1: {
        flex: 1,
        flexDirection: 'row',
        margin: 10

    },
    textLabel: {
        fontFamily: 'AveriaLibre-Regular',
        color: 'white',
        fontSize: 20,
    },
    text: {
        fontFamily: 'AveriaLibre-Regular',
        color: 'white',
        fontSize: 19,
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
        alignItems: 'center',
    },
})

export default CheckBoxSex