// Importação
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import { useState } from 'react'

// Definição
const Modal = (props) => {
    return(
                <View style={estilos.burguertodo}>
                    <View style={estilos.burguercaixaNome}>
                        <Text style={estilos.burguertext}>Olá Jurandir</Text>
                    </View>
                    <View style={estilos.burguerbarra}></View>

                    <TouchableOpacity>
                        <View style={estilos.burguerlinha}>
                            <Text style={estilos.burguertext}>Minhas vacinas</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={estilos.burguerlinha}>
                            <Text style={estilos.burguertext}>Próximas vacinas</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={estilos.burguerlinha}>
                            <Text style={estilos.burguertext}>Sair</Text>
                        </View>
                    </TouchableOpacity>
                </View>
    )
}

const estilos = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'red'
    },
    burguerbarra: {
        flex: 0.005,
        marginHorizontal: 10,
        marginBottom: 30,
        backgroundColor: '#419ED7'
    },
    burguertodo: {
        flex: 1,
        width: '75%',
        backgroundColor: '#ADD4D0'
    },
    burguerlinha: {
        flexDirection: 'row',
        margin: 15,
        alignItems: 'flex-start'
    },
    burguercaixaNome: {
        alignItems: 'center',
        margin: 50,
    },
    burguertext: {
        fontSize: 30,
        fontFamily: 'AveriaLibre-Regular',
        color: '#419ED7',
        margin: 5,
    },
    burguerimagem: {
        width: 40,
        height: 40
    },
    })

export default Modal