import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'

const CardSimples = (props) => {
    const data = new Date()
    const diaAtual = data.getDate()
    const mesAtual = data.getMonth() + 1
    const anoAtual = data.getFullYear()

    const [renderiza, setRenderiza] = useState(false)

    const proxDose = new Date(props.item.proxima * 1000)
    const diaProx = proxDose.getDate()
    const mesProx = proxDose.getMonth() + 1
    const anoProx = proxDose.getFullYear()
    const proxDoseTratada = diaProx + '/' + mesProx + '/' + anoProx


    const renderizar = () => {
        if (proxDose !== '' && proxDose.getTime()/1000 !== 0) {
            if (anoProx > anoAtual) {
                setRenderiza(true)
            }
            else if (anoProx === anoAtual) {
                if (mesProx > mesAtual) {
                    setRenderiza(true)
                }
                else if (mesProx === mesAtual) {
                    if (diaProx >= diaAtual) {
                        setRenderiza(true)
                    }
                }
            }
        }
    }

    useEffect(() => {
        renderizar()
    }, [])

    return (
        <View style={estilos.container}>
            {
                renderiza ?
                    <View>
                        <View style={estilos.caixaTitle}>
                            <Text style={estilos.caixaTitle.title}>{props.item.nome}</Text>
                        </View>
                        <View style={estilos.caixaProx}>
                            <Text style={estilos.caixaProx.prox}>{proxDoseTratada}</Text>
                        </View>
                    </View>
                    : null
            }
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        margin: 10,
        width: '95%',
        alignSelf: 'center'
    },
    caixaTitle: {
        alignItems: 'baseline',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingTop: 10,
        title: {
            fontSize: 30,
            fontFamily: 'AveriaLibre-Regular',
            textAlign: 'center',
            color: '#3F92C5',
        }
    },
    caixaProx: {
        alignItems: 'baseline',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingBottom: 10,
        prox: {
            color: '#8B8B8B',
            fontSize: 25,
            fontFamily: 'AveriaLibre-Regular',
        }
    }
})

export default CardSimples