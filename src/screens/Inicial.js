// Importação
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Image, ImageBackground } from 'react-native'
import { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { reducerSetidUsuario } from '../redux/idUsuarioSlice';

import FormLogin from '../components/FormLogin'

const image = require('../assets/images/background.png');

// Definição
const Inicial = (props) => {
  const dispatch = useDispatch()
  
  const goToHome = (idUsuarioLogado, nomeUsuarioLogado) => {
    dispatch(reducerSetidUsuario({idUsuario: idUsuarioLogado}))
    props.navigation.navigate('Minhas vacinas', { nomeUsuarioLogado: nomeUsuarioLogado})
  }

  const goToCriarConta = () => {
    props.navigation.navigate('Criar conta')
  }

  const goToRecuperarSenha = () => {
    props.navigation.navigate('Recuperar senha')
  }

  return (
    <View style={estilos.container}>

      <ImageBackground source={image} resizeMode="cover" style={estilos.bg} imageStyle={{opacity:0.3}}>
        
        <View style={estilos.header}>
          <View style={estilos.header.boxlogo}>
            <Image style={estilos.header.logo} source={require('../assets/images/logo.png')}/>
            <Text style={estilos.header.title}>MyHealth</Text>
          </View>
        </View>

        <View style={estilos.header.boxsub}>
          <Text style={estilos.header.subtitle}>Controle as suas vacinas e fique seguro</Text>
        </View>

        <View style={estilos.formLogin}>
          <FormLogin func={goToHome} func2={goToCriarConta} func3={goToRecuperarSenha}/>
        </View>

      </ImageBackground>

    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    alignItems:'center',
    flex: 2,
    boxlogo: {
      flex: 2,
      flexDirection:'row',
      marginVertical: 15,
    },
    boxsub: {
      flex: 2,
      marginVertical: 5,
    },
    logo: {
      width:80,
      height:80,
    },  
    title: {
      fontSize: 56,
      color: '#419ED7',
      textDecorationLine: 'underline',
      fontFamily: 'AveriaLibre-Regular',      
    },
    subtitle: {
      fontSize: 34,
      color: '#419ED7',
      margin: 10,
      textAlign: 'center',
      fontFamily: 'AveriaLibre-Regular',
    }
  },
  formLogin: {
    margin: 10,
    flex: 6
  }
});

// Exportação
export default Inicial