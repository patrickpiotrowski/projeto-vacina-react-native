// Importação
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import { useState, useEffect } from 'react'
import { HelperText } from 'react-native-paper'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth_mod, db } from '../firebase/config';
import { onSnapshot, query, collection } from 'firebase/firestore';

import ButtonGreen from './ButtonGreen'
import ButtonBlue from './ButtonBlue'
import ButtonGray from './ButtonGray'

// Definição
const FormLogin = (props) => {
    const [email, setEmail] = useState('patrick-piotrowski@hotmail.com')
    const [senha, setSenha] = useState('123456')
    const [mensagemErro, setMensagemErro] = useState('')

    const [carregando, setCarregando] = useState(false)

    const hasErrors = () => {
        return !email.includes('@')
    }

    const criarMsgErro = (error) => {
        if (error.code === 'auth/user-not-found') {
            setMensagemErro('Usuário não encontrado!')
        }
        else if (error.code === 'auth/wrong-password') {
            setMensagemErro('Usuário e/ou senha não confere!')
        }
    }

    const autenticar = () => {
        setCarregando(true)
        signInWithEmailAndPassword(auth_mod, email, senha)
            .then((userLogged) => {
                console.log('Usuário autenticado!')
                setEmail('')
                setSenha('')
                setMensagemErro('')

                const idUsuarioLogado = userLogged._tokenResponse.localId
                onSnapshot(query(collection(db, 'usuarios/' + idUsuarioLogado + '/dados')), (resultado) => {
                    const nomeUsuarioLogado = resultado._snapshot.docs.sortedSet.root.key.data.value.mapValue.fields.nome.stringValue
                    // caminho do nome no resultado
                    props.func(idUsuarioLogado, nomeUsuarioLogado)
                })
                console.log('Nome deu boa!')
                setCarregando(false)
            })
            .catch((error) => {
                console.log('Autenticação falhou!' + JSON.stringify(error))
                criarMsgErro(error)
                setCarregando(false)
            })

    }

    return (
        <View style={estilos.container}>
            <View style={estilos.inputbox}>
                <Text style={{ fontFamily: 'AveriaLibre-Regular', fontSize: 20 }}>Email:</Text>
                <TextInput
                    style={estilos.textInput}
                    value={email}
                    onChangeText={setEmail}
                    placeholder={'Email'}
                />
            </View>

            <View style={estilos.inputbox}>
                <Text style={{ fontFamily: 'AveriaLibre-Regular', fontSize: 20 }}>Senha:</Text>
                <TextInput
                    style={estilos.textInput}
                    value={senha}
                    placeholder={'Senha'}
                    secureTextEntry={true}
                    onChangeText={setSenha}
                />
                <HelperText type="error" visible={hasErrors()}>
                    E-mail e/ou senha inválidos.
                </HelperText>
            </View>
            {
                mensagemErro !== '' ?
                    <HelperText style={{ fontSize: 20 }} type="error">{mensagemErro}</HelperText>
                    : null
            }


            <ButtonGreen texto='Entrar' func={autenticar} boolean={carregando} />

            <ButtonBlue texto='Criar minha conta' func={props.func2} />

            <ButtonGray texto='Esqueci minha senha' func={props.func3} />
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1
    },
    textInput: {
        fontFamily: 'AveriaLibre-Regular',
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        marginVertical: 5,
        padding: 10,
        fontSize: 18
    },
    text: {
        color: '#FD7979',
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 20
    }
})

// Exportação
export default FormLogin