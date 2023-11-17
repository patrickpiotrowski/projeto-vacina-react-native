// Importação
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Button, Image, ImageBackground } from 'react-native'
import { RadioButton } from 'react-native-paper';
import { useState } from 'react';

// Definição
const CheckBoxDoses = (props) => {

    return (
        <View style={estilos.todo}>
            <View style={estilos.linha1}>
                <View style={estilos.caixaText}>
                    <Text style={estilos.textLabel}>{props.label} </Text>
                </View>

                <View style={estilos.caixaInput}>
                    <View style={estilos.opcao}>
                        <RadioButton value="1a"
                            status={props.param === '1a' ? 'checked' : 'unchecked'}
                            onPress={props.func1a} />
                        <Text style={estilos.text}>1a dose</Text>
                    </View>
                    <View style={estilos.opcao}>
                        <RadioButton value="2a"
                            status={props.param === '2a' ? 'checked' : 'unchecked'}
                            onPress={props.func2a} />
                        <Text style={estilos.text}>2a dose</Text>
                    </View>
                    <View style={estilos.opcao}>
                        <RadioButton value="3a"
                            status={props.param === '3a' ? 'checked' : 'unchecked'}
                            onPress={props.func3a} />
                        <Text style={estilos.text}>3a dose</Text>
                    </View>
                    <View style={estilos.opcao}>
                        <RadioButton value='Única'
                            status={props.param === 'Única' ? 'checked' : 'unchecked'}
                            onPress={props.funcUnica} />
                        <Text style={estilos.text}>Dose única</Text>
                    </View>



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
        margin: 10,

    },
    textLabel: {
        fontFamily: 'AveriaLibre-Regular',
        color: 'white',
        fontSize: 20,
        marginTop: 5
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
        flexWrap: 'wrap',
    },
    caixaText: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    opcao: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default CheckBoxDoses