// Importação
import { View, Text, StyleSheet, TextInput, FlatList, Modal, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import ButtonGreen from '../components/ButtonGreen';
import Card from '../components/Card';
import { collection, onSnapshot, query, } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useSelector } from 'react-redux'

// Definição
const Home = (props) => {

    const searchicon = require('../assets/images/search.png');

    const [listaVacinas, setListaVacinas] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    const idUsuarioLogado = useSelector((state) => state.idUsuario.idUsuario) // usando o redux pra receber

    const nomeUsuarioLogado = props.route.params.nomeUsuarioLogado.split(' ')[0]

    const q = query(collection(db, 'usuarios/' + idUsuarioLogado + '/vacinas'))

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
            setListaVacinas(listaAuxiliar)
        })
    }, [])

    const goToInicial = () => {
        setVisible(false)
        props.navigation.popToTop()
    }
    const goToCriar = () => {
        props.navigation.navigate('Criar Vacina', { idUsuarioLogado: idUsuarioLogado })
    }

    const goToProximas = () => {
        setVisible(false)
        props.navigation.navigate('Proximas')
    }


    const [isVisible, setVisible] = useState(false)

    const imagemVacina = require('../assets/images/logo.png')
    const imagemCalendar = require('../assets/images/calendar.png')
    const imagemSair = require('../assets/images/sair.png')
    const imagemBurguer = require('../assets/images/burguer.png')

    return (
        <View style={estilos.container}>

            <Modal visible={isVisible} animationType='fade' transparent={true}>

                <View style={estilos.containerModal}>
                    <View style={estilos.burguertodo}>
                        <View style={estilos.burguercaixaNome}>
                            <Text style={estilos.burguertext}>Olá {nomeUsuarioLogado}</Text>
                        </View>
                        <View style={estilos.burguerbarra}></View>

                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <View style={estilos.burguerlinha}>
                                <View style={estilos.burguercaixaImagem}>
                                    <Image source={imagemVacina} style={estilos.burguerimagem} />
                                </View>
                                <Text style={estilos.burguertext}>Minhas vacinas</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goToProximas}>
                            <View style={estilos.burguerlinha}>
                                <View style={estilos.burguercaixaImagem}>
                                    <Image source={imagemCalendar} style={estilos.burguerimagem} />
                                </View>
                                <Text style={estilos.burguertext}>Próximas vacinas</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goToInicial}>
                            <View style={estilos.burguerlinha}>
                                <View style={estilos.burguercaixaImagem}>
                                    <Image source={imagemSair} style={estilos.burguerimagem} />
                                </View>
                                <Text style={estilos.burguertext}>Sair</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => setVisible(false)} activeOpacity={1} style={estilos.burguerFora}>
                    </TouchableOpacity>
                </View>

            </Modal>

            <View style={estilos.superior}>
                <TouchableOpacity style={estilos.superior.drawer} onPress={() => setVisible(true)}>
                    <Image source={imagemBurguer} style={estilos.superior.image} />
                </TouchableOpacity>
                <Text style={estilos.superior.text}>Minhas vacinas</Text>
            </View>

            <View style={estilos.pesquisar}>
                <View style={estilos.pesquisar.icon}>
                    <Image source={searchicon} style={estilos.pesquisar.icon.image} />
                </View>
                <TextInput placeholder='PESQUISAR VACINA' style={estilos.pesquisar.textinput} value={pesquisa} onChangeText={setPesquisa} />
            </View>

            {
                listaVacinas.length === 0 ?
                    <View>
                        <Text style={estilos.text}>Nenhuma vacina cadastrada</Text>
                        <Text style={estilos.text}>Comece agora!</Text>
                    </View>
                    : null
            }

            <View style={estilos.meio}>
                <FlatList
                    style={{ flex: 1, width: '100%' }}
                    data={listaVacinas.filter((item) => item.nome.includes(pesquisa))}
                    renderItem={({ item }) => <Card item={item} navigation={props.navigation} />}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
            </View>

            <View style={estilos.button}>
                <ButtonGreen texto='Nova vacina' func={goToCriar}></ButtonGreen>
            </View>

        </View>


    )
}

const estilos = StyleSheet.create({
    containerModal: {
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        margin: 5,
        textAlign: 'center'
    },
    container: {
        flex: 100,
        backgroundColor: '#ADD4D0'
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
            flex: 8
        },
        drawer: {
            flex: 2
        },
        image: {
            margin: 10,
            width: 50,
            height: 50
        },
    },
    pesquisar: {
        margin: 10,
        backgroundColor: '#ADD4D0',
        flex: 5,
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        icon: {
            padding: 10,
            backgroundColor: 'white',
            width: '10%',
            image: {
                width: 20,
                height: 20,
            }
        },
        textinput: {
            fontFamily: 'AveriaLibre-Regular',
            borderWidth: 2,
            borderColor: 'white',
            backgroundColor: 'white',
            marginVertical: 5,
            padding: 10,
            fontSize: 16,
            width: '90%',
            height: 40
        }
    },
    meio: {
        flex: 70,
        backgroundColor: '#ADD4D0',
        alignItems: 'center',
        flexWrap: 'wrap',
        cards: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 10,
            flexWrap: 'wrap',
        },
    },
    button: {
        flex: 10,
        alignItems: 'center',
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
    burguerFora: {
        width: '25%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
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

// Exportação
export default Home
