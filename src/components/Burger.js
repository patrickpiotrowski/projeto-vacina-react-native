import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Image } from 'react-native'
import { useState } from 'react'

// Definição
const Burger = (props) => {

    const [isVisible, setVisible] = useState(props.isVisible)

    const imagemVacina = require('../assets/images/logo.png')
    const imagemCalendar = require('../assets/images/calendar.png')
    const imagemSair = require('../assets/images/sair.png')

    return(
        <View style={estilos.burguertodo}>

            <View style={estilos.caixaNome}>
                <Text style={estilos.text}>Olá Jurandir</Text>
            </View>
            <View style={estilos.burguerbarra}>
            </View>

            <TouchableOpacity onPress={setVisible(false)}>
                <View style={estilos.burguerlinha}>
                    <View style={estilos.caixaImagem}>
                        <Image source={imagemVacina} style={estilos.imagem}/>
                    </View>
                    <Text style={estilos.text}>Minhas vacinas</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={estilos.burguerlinha}>
                    <View style={estilos.caixaImagem}>
                        <Image source={imagemCalendar} style={estilos.imagem}/>
                    </View>
                    <Text style={estilos.text}>Próximas vacinas</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.funcInicial}>
                <View style={estilos.burguerlinha}>
                    <View style={estilos.caixaImagem}>
                        <Image source={imagemSair} style={estilos.imagem}/>
                    </View>
                    <Text style={estilos.text}>Sair</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const estilos = StyleSheet.create({
    burguerbarra: {
        flex: 0.005,
        marginHorizontal: 10,
        marginBottom: 30,
        backgroundColor: '#419ED7'
    },
    burguertodo: {
        flex: 1,
        width: '75%',
        backgroundColor:'#ADD4D0'
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

export default Burger