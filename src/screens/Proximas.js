// Importação
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, StatusBar, Button, Image, ImageBackground } from 'react-native'
import { Fragment, useState, useEffect, Component } from 'react'
import { collection, onSnapshot, query, } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useSelector } from 'react-redux'

import ButtonGreen from '../components/ButtonGreen';
import CardSimples from '../components/CardSimples';

const backicon = require('../assets/images/back.png');
const image = require('../assets/images/comprovante.png');

// Definição
const Proximas = (props) => {
    const idUsuarioLogado = useSelector((state) => state.idUsuario.idUsuario) // usando o redux pra receber

    const [listaVacinas, setListaVacinas] = useState([])

    const q = query(collection(db, 'usuarios/' + idUsuarioLogado + '/vacinas'))

    const goToHome = () => {
        props.navigation.pop()
    }

    const goToCriar = () => {
        props.navigation.navigate('Criar Vacina')
    }

    useEffect(() => {
        onSnapshot(q, (result) => {
            const listaAuxiliar = []
            result.forEach((doc) => {
                listaAuxiliar.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    data: doc.data().data,
                    dose: doc.data().dose,
                    proxima: doc.data().proxima,
                    imagepath: doc.data().imagepath
                })
            })
            listaAuxiliar.sort(function compare(a, b) {
                if (a.proxima < b.proxima) return -1;
                if (a.proxima > b.proxima) return 1;
                return 0;
            })
            setListaVacinas(listaAuxiliar)
        })
        

    }, [])

    return (
        <View style={estilos.container}>

            <View style={estilos.superior}>
                <TouchableOpacity onPress={goToHome}>
                    <View style={estilos.superior.voltar}>
                        <Image source={backicon} style={estilos.superior.voltar.icon} />
                    </View>
                </TouchableOpacity>

                <Text style={estilos.superior.text}>Próximas vacinas</Text>
            </View>

            <View style={estilos.meio}>
                <FlatList
                    style={{ flex: 1, width: '100%' }}
                    data={listaVacinas}
                    renderItem={({ item }) => <CardSimples item={item} navigation={props.navigation} />}
                    keyExtractor={item => item.id}
                    numColumns={1}
                />
            </View>

            <View style={estilos.button}>
                <ButtonGreen texto='Nova vacina' func={goToCriar}></ButtonGreen>
            </View>

        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
    },
    superior: {
        flex: 10,
        backgroundColor: '#C1E7E3',
        flexDirection: 'row',
        alignItems: 'center',
        text: {
            fontSize: 35,
            fontFamily: 'AveriaLibre-Regular',
            color: '#419ED7',
            margin: 5,
        },
        voltar: {
            margin: 10,
            icon: {
                width: 50,
                height: 50
            }
        },
    },
    meio: {
        flex: 70,
        backgroundColor: '#ADD4D0',
        justifyContent: 'center',
        text: {
            fontFamily: 'AveriaLibre-Regular',
            fontSize: 20,
            color: '#FFFFFF'
        }
    },
    button: {
        flex: 10,
        alignItems: 'center',
        backgroundColor: '#ADD4D0',
    }
})

// Exportação
export default Proximas
