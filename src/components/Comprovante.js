// Importação
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ImageBackground } from 'react-native'
import ButtonGallery from './ButtonGallery'
import ButtonCamera from './ButtonCamera'

// Definição
const Comprovante = (props) => {
    return (
        <View style={estilos.todo}>
            <View style={estilos.linha1}>
                <View style={estilos.caixaText}>
                    <Text style={estilos.textLabel}>{props.label} </Text>
                </View>

                <View style={estilos.caixaInput}>
                    <View style={estilos.opcao}>
                        <ButtonGallery func={props.func2}></ButtonGallery>
                        <ButtonCamera func={props.func1}></ButtonCamera>
                        {
                            props.image !== '' ? 
                            <Image source={{ uri: props.image }} style={{
                                height: 80,
                                width: 110,
                                marginHorizontal: 26
                            }} /> 
                            :
                            null
                        }
                       
                    </View>
                </View>
            </View>
        </View>
    )
}


const estilos = StyleSheet.create({
    caixaImage: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
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
        alignItems: 'center',
    },
    opcao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 0
    },
    button: {
        backgroundColor: '#419ED7'
    }
})


export default Comprovante