// Importação
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { HelperText } from 'react-native-paper';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/config';
import { uploadBytes, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { useSelector } from 'react-redux'
import LineAllDatePicker from '../components/LineAllDatePicker';

import LineAll from '../components/LineAll';
import ButtonGreen from '../components/ButtonGreen';
import ButtonRed from '../components/ButtonRed';
import CheckBoxDoses from '../components/CheckBoxDoses';
import ButtonRedNoTrash from '../components/ButtonRed(NoTrash)';
import ButtonBlueCancel from '../components/ButtonBlueCancel';
import Comprovante from '../components/Comprovante';


const backicon = require('../assets/images/back.png');
const image = require('../assets/images/comprovante.png');

// Definição
const EditarVacina = (props) => {

    const idUsuarioLogado = useSelector((state) => state.idUsuario.idUsuario) // usando o redux pra receber o parametro

    const [isVisible, setVisible] = useState(false)
    const [checked, setChecked] = useState('');
    const [dataVacina, setDataVacina] = useState(new Date())
    const [vacina, setVacina] = useState('')
    const [proxDose, setProxDose] = useState(new Date())
    const [imagem, setImagem] = useState('')
    const [imagemAntiga, setImagemAntiga] = useState('')

    const [carregando, setCarregando] = useState(false)
    const [carregandoExcluir, setCarregandoExcluir] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')

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

    useEffect(() => {
        if (props.route.params?.id) {
            getDoc(doc(db, 'usuarios/' + idUsuarioLogado + '/vacinas', props.route.params.id))
                .then((result) => {
                    const dateDataVacina = new Date(result.data().data * 1000)
                    const dateProxDose = new Date(result.data().proxima * 1000)

                    setDataVacina(dateDataVacina)
                    setVacina(result.data().nome)
                    setProxDose(dateProxDose)
                    setChecked(result.data().dose)
                    setImagem(result.data().imagepath)
                    setImagemAntiga(result.data().imagepath)
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }, [])

    const salvar = async () => {
        const timestampDataVacina = dataVacina.getTime() / 1000
        let timestampProxDose = ''

        if (checked === 'Única') {
            timestampProxDose = ''
        }
        else {
            timestampProxDose = proxDose.getTime() / 1000
        }

        if (doseCheck == true && nomeCheck == true) {
            if (imagem !== '' && imagem !== imagemAntiga) {
                const imageRef = ref(storage, 'usuarios/' + idUsuarioLogado + '/comprovantes/' + imagem.split('/')[8])
                const file = await fetch(imagem)
                const blob = await file.blob()

                setCarregando(true)

                uploadBytes(imageRef, blob, { contentType: 'image/jpeg' })
                    .then((result) => {
                        console.log('Imagem upada com sucesso!')
                        getDownloadURL(imageRef)
                            .then((url) => {
                                console.log('URL pega com sucesso!' + url)
                                updateDoc(doc(db, 'usuarios/' + idUsuarioLogado + '/vacinas', props.route.params.id), {
                                    data: timestampDataVacina,
                                    nome: vacina,
                                    proxima: timestampProxDose,
                                    dose: checked,
                                    imagepath: url
                                })
                                    .then((result) => {
                                        console.log('Update foi um sucesso!')
                                        
                                        if (imagemAntiga !== '') {
                                            const imageRefAntiga = ref(storage, 'usuarios/' + idUsuarioLogado + '/comprovantes/' + imagemAntiga.split('%2F')[3].split('?')[0])
                                            deleteObject(imageRefAntiga)
                                                .then((result) => {
                                                    console.log('Comprovante antigo deletado com sucesso!')
                                                    setCarregando(false)
                                                    goToHome()
                                                })
                                                .catch((error) => {
                                                    console.log('Comprovante deletado deu ruim!' + JSON.stringify(error))
                                                    setMensagemErro('Apagar comprovante antigo não deu certo! Tente novamente.')
                                                    setCarregando(false)
                                                })
                                        }
                                        else {
                                            goToHome()
                                        }
                                    })
                                    .catch((error) => {
                                        console.log('Update deu ruim! ' + JSON.stringify(error))
                                        setMensagemErro('Edição da vacina não deu certo! Tente novamente.')
                                        setCarregando(false)
                                    })
                            })
                            .catch((error) => {
                                console.log('Erro ao pegar url imagem!' + JSON.stringify(error))
                                setMensagemErro('Url da imagem não deu certo! Tente novamente.')
                                setCarregando(false)
                            })
                    })
                    .catch((error) => {
                        console.log('Erro ao upar imagem!' + JSON.stringify(error))
                        setMensagemErro('Upload do comprovante não deu certo! Tente novamente.')
                        setCarregando(false)
                    })
            }
            else {
                setCarregando(true)
                updateDoc(doc(db, 'usuarios/' + idUsuarioLogado + '/vacinas', props.route.params.id), {
                    data: timestampDataVacina,
                    nome: vacina,
                    proxima: timestampProxDose,
                    dose: checked,
                    imagepath: imagemAntiga
                })
                    .then((result) => {
                        console.log('Deu boa com img antiga')
                        setCarregando(false)
                        goToHome()
                    })
                    .catch((error) => {
                        setCarregando(false)
                        setMensagemErro('Edição da vacina não deu certo! Tente novamente.')
                        console.log('Deu ruim com img antiga ' + JSON.stringify(error))
                    })
            }
        }

    }

    const exluir = () => {
        setCarregandoExcluir(true)
        setVisible(false)
        if (imagem !== '') {
            const imageRef = ref(storage, 'usuarios/' + idUsuarioLogado + '/comprovantes/' + imagem.split('%2F')[3].split('?')[0])

            deleteDoc(doc(db, 'usuarios/' + idUsuarioLogado + '/vacinas', props.route.params.id))
                .then((result) => {
                    console.log('Vacina deletada com sucesso!')
                    deleteObject(imageRef)
                        .then((result) => {
                            console.log('Comprovante deletado com sucesso!')
                            setCarregandoExcluir(false)
                            goToHome()
                        })
                        .catch((error) => {
                            console.log('Comprovante deletado deu ruim!' + JSON.stringify(error))
                            setCarregandoExcluir(false)
                        })
                })
                .catch((error) => {
                    console.log('Deu ruim deletar! ' + JSON.stringify(error))
                    setMensagemErro('Erro ao excluir vacina! Tente novamente.')
                    setCarregandoExcluir(false)
                })
        }
        else{
            deleteDoc(doc(db, 'usuarios/' + idUsuarioLogado + '/vacinas', props.route.params.id))
                .then((result) => {
                    console.log('Vacina deletada com sucesso!')
                    goToHome()
                    setCarregandoExcluir(false)
                })
                .catch((error) => {
                    console.log('Deu ruim deletar! ' + JSON.stringify(error))
                    setCarregandoExcluir(false)
                })
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

                <Text style={estilos.superior.text}>Editar Vacina</Text>
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
                <ButtonGreen texto='Salvar alterações' func={salvar} boolean={carregando} />
                <ButtonRed texto='Excluir' func={() => setVisible(true)} boolean={carregandoExcluir} />
            </View>

            <Modal visible={isVisible} animationType='fade' transparent={true}>
                <View style={estilos.caixamodal}>
                    <View style={estilos.modal}>
                        <View style={estilos.modal.caixatext}>
                            <Text style={estilos.modal.text}>Tem certeza que deseja remover essa vacina?</Text>
                        </View>
                        <View style={estilos.modal.caixabotoes}>
                            <ButtonRedNoTrash texto='SIM' func={exluir} />
                            <ButtonBlueCancel texto='CANCELAR' func={() => setVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
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
        flex: 20,
        alignItems: 'center',
        backgroundColor: '#ADD4D0',
    },
    caixamodal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
    },
    modal: {
        flex: 0.3,
        backgroundColor: '#FFFFFF',
        margin: 30,
        borderColor: '#B9DFDB',
        borderStyle: 'solid',
        borderWidth: 3,
        text: {
            fontFamily: 'AveriaLibre-Regular',
            fontSize: 25,
            color: '#FD7979',
            textAlign: 'center'
        },
        caixatext: {
            flex: 0.6,
            margin: 10,
            justifyContent: 'center'
        },
        caixabotoes: {
            flex: 0.4,
            flexDirection: 'row',
            justifyContent: 'center'
        }
    }
})

// Exportação
export default EditarVacina
