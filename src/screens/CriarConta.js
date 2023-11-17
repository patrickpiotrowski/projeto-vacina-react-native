// Importação
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { HelperText } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth_mod } from '../firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

import ButtonGreen from '../components/ButtonGreen';
import LineAll from '../components/LineAll';
import LineAllDatePicker from '../components/LineAllDatePicker';
import CheckBoxSex from '../components/CheckBoxSex';

const backicon = require('../assets/images/back.png');
const image = require('../assets/images/comprovante.png');

// Definição
const CriarConta = (props) => {

    let libera = false
    let liberaNome = false
    let liberaEmail = false
    let liberaSenhas = false
    const [carregando, setCarregando] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')

    const goToInicial = () => {
        props.navigation.replace('Inicial')
    }

    const confere = () => {
        if(liberaNome && liberaEmail && liberaSenhas){
            libera = true
        }
    }
    const confereEmail = () => {
        if(email.includes('@') && email.includes('.com')){
            liberaEmail = true
            return !liberaEmail
        }
        else{
            liberaEmail = false
            return !liberaEmail
        }
    }
    const confereNome = () => {
        if (name != '') {
            liberaNome = true
            return !liberaNome
        }
        else{
            liberaNome = false
            return !liberaNome
        }
    }
    const confereSenha = () => {
        if(senha != '' && senha == confsenha && senha.length >= 6) {
            liberaSenhas = true
            return !liberaSenhas
        }
        else{
            liberaSenhas = false
            return !liberaSenhas
        }
    }

    const [checked, setChecked] = useState('');
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confsenha, setConfSenha] = useState('')

    const criarMsgErro = (error) => {
        if (error.code === 'auth/email-already-in-use') {
            setMensagemErro('Este email já foi usado!')
        }
    }

    const cadastrar = () => {
        confere()
        if (libera === true) {
            setCarregando(true)
            createUserWithEmailAndPassword(auth_mod, email, senha)
                .then((userCredencial) => {
                    setMensagemErro('Conta criada com sucesso!')
                    const timestampNascimento = date.getTime() / 1000

                    const colecaoDados = collection(db, 'usuarios/' + userCredencial._tokenResponse.localId + '/dados')
                    addDoc(colecaoDados, {
                        nome: name,
                        sexo: checked,
                        nascimento: timestampNascimento,
                        email: email
                    })
                    .then((refDocVacinas) => {
                        console.log('Dados cadastrados com sucesso! ')
                        setMensagemErro('Dados criados com sucesso!')
                        setCarregando(false)
                        goToInicial()
                    })
                    .catch((error) => {
                        console.log('Deu ruim os dados! ' + JSON.stringify(error))
                        setMensagemErro('Problema com os dados! Tente novamente.')
                        setCarregando(false)
                    })
                    
                })
                .catch((error) => {
                    console.log('Deu ruim criar o usuário! ' + JSON.stringify(error))
                    criarMsgErro(error)
                    setCarregando(false)
                })

        }
    }

    return (
        <View style={estilos.container}>

            <View style={estilos.superior}>
                <TouchableOpacity onPress={goToInicial}>
                    <View style={estilos.superior.voltar}>
                        <Image source={backicon} style={estilos.superior.voltar.icon} />
                    </View>
                </TouchableOpacity>

                <Text style={estilos.superior.text}>Criar conta</Text>
            </View>

            <View style={estilos.meio}>
                <View style={estilos.meio.info}>

                    <LineAll placeholder='Nome completo' label='Nome' value={name}
                        func={setName} />
                    <HelperText visible={confereNome()} type="error">O nome não é válido!</HelperText>

                    <CheckBoxSex label='Sexo' funcm={() => setChecked('m')}
                        funcf={() => setChecked('f')} param={checked} />
                    <LineAllDatePicker label='Nascimento'
                        value={date} func={setDate} />
                    <LineAll placeholder='Email' label='Email' value={email}
                        func={setEmail} />
                    <HelperText visible={confereEmail()} type="error">O email não é válido.</HelperText>
                    
                    <LineAll placeholder='Senha' label='Senha' value={senha}
                        func={setSenha} seguro={true} />
                    <LineAll placeholder='Senha' label='Repetir senha' value={confsenha}
                        func={setConfSenha} seguro={true} />
                    <HelperText type="error" visible={confereSenha()}>As senhas não conferem ou não têm pelo menos 6 caracteres.</HelperText>
                    {
                        mensagemErro !== '' ?
                            <HelperText style={{ fontSize: 20 }} type="error">{mensagemErro}</HelperText>
                            : null
                    }
                </View>
            </View>
            <View style={estilos.button}>
                <ButtonGreen texto='Cadastrar' func={cadastrar} boolean={carregando}/>
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

        info: {
            margin: 10,
            flex: 0.7,
        },
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
export default CriarConta
