// Importação
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Image } from 'react-native'
import galleryIcon from '../assets/images/gallery.png'


// Definição
const ButtonGallery = (props) => {
    return (
            <TouchableOpacity style={estilos.touchable} onPress={props.func}>
                <Image style={estilos.image} source={galleryIcon}></Image>
            </TouchableOpacity>
    )
}

const estilos = StyleSheet.create({
    touchable: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#419ED7',
        padding: 5,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    image: {
        width: 30,
        height: 30
    },
    container: {
        display: 'flex',
        flexDirection: 'row'
    }
})

export default ButtonGallery