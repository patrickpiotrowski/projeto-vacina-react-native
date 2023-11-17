// Importação
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth';
import { HelperText } from 'react-native-paper';
import { auth_mod } from '../firebase/config';

import ButtonGreen from '../components/ButtonGreen';
import Line from '../components/Line';

const backicon = require('../assets/images/logo.png');

// Definição
const RecuperarSenha = (props) => {
    const [carregando, setCarregando] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')

    let liberaEmail = false

    const goToInicial = () => {
        props.navigation.popToTop()
    }

    const confereEmail = () => {
        if (email.includes('@') && email.includes('.com')) {
            liberaEmail = true
            return !liberaEmail
        }
        else {
            liberaEmail = false
            return !liberaEmail
        }
    }

    const criarMsgErro = (error) => {
        if (error.code === 'auth/user-not-found') {
            setMensagemErro('Usuário não encontrado!')
        }
    }

    const redefinirSenha = () => {
        if (liberaEmail) {
            setCarregando(true)
            sendPasswordResetEmail(auth_mod, email)
                .then(() => {
                    setMensagemErro('Deu boa! Veja seu email.')
                    setCarregando(false)
                })
                .catch((error) => {
                    console.log('Deu ruim! Sepa o email tá errado hein! ' + error.code)
                    criarMsgErro(error)
                    setCarregando(false)
                })
        }
    }

    const [email, setEmail] = useState('')
    return (
        <View style={estilos.container}>

            <View style={estilos.superior}>
                <TouchableOpacity onPress={goToInicial}>
                    <View style={estilos.superior.voltar}>
                        <Image source={backicon} style={estilos.superior.voltar.icon} />
                    </View>
                </TouchableOpacity>
                <Text style={estilos.superior.text}>MyHealth</Text>
            </View>

            <View style={estilos.meio}>
                <View style={estilos.meio.info}>
                    <Line label='Email' placeholder='Email'
                        value={email} func={setEmail} />
                </View>
                <HelperText style={{ fontSize: 20 }} visible={confereEmail()} type="error">O email não é válido.</HelperText>
                {
                    mensagemErro !== '' ?
                        <HelperText style={{ fontSize: 20 }} type="error">{mensagemErro}</HelperText>
                        : null
                }
            </View>

            <View style={estilos.button}>
                <ButtonGreen texto='Recuperar senha' func={redefinirSenha} boolean={carregando} />
            </View>


        </View>


    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 100,
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
        alignItems: 'center',
        info: {
            flex: 1,
            flexDirection: 'row'
        },
    },
    button: {
        flex: 20,
        alignItems: 'center',
        backgroundColor: '#ADD4D0',
    }
})

// Exportação
export default RecuperarSenha
