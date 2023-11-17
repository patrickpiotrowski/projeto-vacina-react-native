// Importação
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Button, Image, ImageBackground } from 'react-native'
import { Fragment, useState, useEffect, Component } from 'react'
import { HelperText } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../firebase/config';
import { useSelector } from 'react-redux'

import LineAll from '../components/LineAll';
import LineAllDatePicker from '../components/LineAllDatePicker';
import ButtonGreen from '../components/ButtonGreen';;
import CheckBoxDoses from '../components/CheckBoxDoses';
import Comprovante from '../components/Comprovante'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const backicon = require('../assets/images/back.png');

// Definição
const CriarVacina = (props) => {
    const idUsuarioLogado = useSelector((state) => state.idUsuario.idUsuario) // usando o redux pra receber o parametro

    const [checked, setChecked] = useState('');
    const [dataVacina, setDataVacina] = useState(new Date())
    const [vacina, setVacina] = useState('')
    const [proxDose, setProxDose] = useState(new Date())
    const [imagem, setImagem] = useState('')

    const [carregando, setCarregando] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')

    const optionsGaleria = {
        mediaType: 'photo',
        cameraType: 'back',
        maxWidth: 180,
        maxHeight: 120,
        quality: 1,
    }

    const optionsCamera = {
        mediaType: 'photo',
        maxWidth: 180,
        maxHeight: 120,
        quality: 1,
    }

    const escolheImagemGaleria = async () => {
        launchImageLibrary(optionsGaleria)
            .then((result) => {
                setImagem(result.assets[0].uri)
                console.log('Imagem pela galeria deu boa!')
            })
            .catch((error) => {
                console.log('Imagem pela galeria deu ruim!' + JSON.stringify(error))
            })
    }

    const escolheImagemCamera = async () => {
        launchCamera(optionsCamera)
            .then((result) => {
                setImagem(result.assets[0].uri)
                console.log('Imagem pela câmera deu boa!')
            })
            .catch((error) => {
                console.log('Imagem pela câmera deu ruim!' + JSON.stringify(error))
            })
    }

    let doseCheck = false
    let nomeCheck = false

    const goToHome = () => {
        props.navigation.pop()
    }

    const doseErrada = () => {
        if (checked == '') {
            return true
        }
        else {
            doseCheck = true
            return false
        }
    }

    const nomeErrado = () => {
        if (vacina.length < 2) {
            return true
        }
        else {
            nomeCheck = true
            return false
        }
    }

    const salvar = async () => {
        const timestampDataVacina = dataVacina.getTime() / 1000
        let timestampProxDose = ''

        if(checked === 'Única'){
            timestampProxDose = ''
        }
        else{
            timestampProxDose = proxDose.getTime() / 1000
        }

        if (doseCheck == true && nomeCheck == true) {
            if (imagem !== '') {
                const imageRef = ref(storage, 'usuarios/' + idUsuarioLogado + '/comprovantes/' + imagem.split('/')[8])
                const file = await fetch(imagem)
                const blob = await file.blob()
                
                setCarregando(true)

                uploadBytes(imageRef, blob, { contentType: 'image/jpeg' })
                    .then((result) => {
                        console.log('Imagem upada com sucesso!')
                        getDownloadURL(imageRef)
                            .then((url) => {
                                addDoc(collection(db, 'usuarios/' + idUsuarioLogado + '/vacinas'), {
                                    data: timestampDataVacina,
                                    dose: checked,
                                    nome: vacina,
                                    proxima: timestampProxDose,
                                    imagepath: url
                                })
                                    .then((result) => {
                                        console.log('Vacina deu boa! ')
                                        setCarregando(false)
                                        goToHome()
                                    })
                                    .catch((error) => {
                                        console.log('Vacina deu ruim! ' + JSON.stringify(error))
                                        setMensagemErro('Cadastro da vacina não deu certo! Tente novamente.')
                                        setCarregando(false)
                                    })
                            })
                    })
                    .catch((error) => {
                        console.log('Erro ao upar imagem!' + JSON.stringify(error))
                        setMensagemErro('Erro ao upar imagem da vacina! Tente novamente.')
                        setCarregando(false)
                    })
            }
            else {
                setCarregando(true)
                addDoc(collection(db, 'usuarios/' + idUsuarioLogado + '/vacinas'), {
                    data: timestampDataVacina,
                    dose: checked,
                    nome: vacina,
                    proxima: timestampProxDose,
                    imagepath: ''
                })
                    .then((result) => {
                        console.log('Vacina deu boa! ')
                        setCarregando(false)
                        goToHome()
                    })
                    .catch((error) => {
                        console.log('Vacina deu ruim! ' + JSON.stringify(error))
                        setMensagemErro('Cadastro da vacina não deu certo! Tente novamente.')
                        setCarregando(false)
                    })
            }

        }
    }

    return (
        <View style={estilos.container}>

            <View style={estilos.superior}>
                <TouchableOpacity onPress={goToHome}>
                    <View style={estilos.superior.voltar}>
                        <Image source={backicon} style={estilos.superior.voltar.icon} />
                    </View>
                </TouchableOpacity>

                <Text style={estilos.superior.text}>Cadastrar Vacina</Text>
            </View>

            <View style={estilos.meio}>
                <View style={estilos.meio.info}>

                    <LineAllDatePicker label='Data da vacina'
                        value={dataVacina} func={setDataVacina} />

                    <LineAll placeholder='Vacina' label='Vacina'
                        value={vacina} func={setVacina} />
                    <HelperText type="error" visible={nomeErrado()}>
                        O nome é obrigatório.
                    </HelperText>
                    <CheckBoxDoses label='Dose' param={checked}
                        func1a={() => setChecked('1a')}
                        func2a={() => setChecked('2a')}
                        func3a={() => setChecked('3a')}
                        funcUnica={() => setChecked('Única')} />
                    <HelperText type="error" visible={doseErrada()}>
                        A dose é obrigatória.
                    </HelperText>
                    <Comprovante label='Comprovante' func1={escolheImagemCamera} func2={escolheImagemGaleria} image={imagem} />
                    
                    {
                        checked === 'Única' ? null
                        :
                        <LineAllDatePicker label='Próxima dose'
                        value={proxDose} func={setProxDose} />
                    }
                    
                </View>
                {
                    mensagemErro !== '' ?
                        <HelperText style={{ fontSize: 20 }} type="error">{mensagemErro}</HelperText>
                        : null
                }
            </View>

            <View style={estilos.button}>
                <ButtonGreen texto='Salvar' func={salvar} boolean={carregando}/>
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
        flex: 75,
        backgroundColor: '#ADD4D0',
        justifyContent: 'center',

        info: {
            margin: 10,
            flex: 0.8,
            justifyContent: 'flex-end'
        },
        text: {
            fontFamily: 'AveriaLibre-Regular',
            fontSize: 20,
            color: '#FFFFFF'
        }
    },
    button: {
        flex: 15,
        alignItems: 'center',
        backgroundColor: '#ADD4D0',
    }
})

// Exportação
export default CriarVacina
