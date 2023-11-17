import {View, Text, StyleSheet, Image,TouchableOpacity,} from 'react-native'
import {useEffect} from 'react'

const Card = (props) => {
    const dataVacina = new Date(props.item.data*1000)
    const proxDose = new Date(props.item.proxima*1000)

    const dataVacinaTratada = dataVacina.getDate() + '/' + (dataVacina.getMonth()+1) + '/' + dataVacina.getFullYear()
    const proxDoseTratada = proxDose.getDate() + '/' + (proxDose.getMonth()+1) + '/' + proxDose.getFullYear()
    
    const goToEditar = (id) => {
        props.navigation.navigate('Editar Vacina', { id: props.item.id})
    }       

    return(
        <TouchableOpacity style={estilos.container} onPress={goToEditar}>
                <View style={estilos.caixaTitle}>
                    <Text style={estilos.caixaTitle.title}>{props.item.nome}</Text>
                </View>
                <View style={estilos.caixaDose}>
                    <Text style={estilos.caixaDose.dose}>{props.item.dose} dose</Text>
                </View>
                <View style={estilos.caixaData}>
                    <Text style={estilos.caixaData.data}>{dataVacinaTratada}</Text>
                </View>
                <View style={estilos.caixaImagem}>
                {
                    props.item.imagepath !== ''?
                    
                        <Image style={estilos.caixaImagem.imagem} source={{ uri: props.item.imagepath }}/>
                    :
                    null
                }
                </View>
                {
                    (proxDose.getTime() / 1000) !== 0 ?
                    <View style={estilos.caixaProx}>
                        <Text style={estilos.caixaProx.prox}>Próxima dose {proxDoseTratada}</Text>
                    </View>
                    : 
                    <View style={estilos.caixaProx}>
                        <Text style={estilos.caixaProx.prox}>Não há próxima dose</Text>
                    </View>
                }
                
        </TouchableOpacity>
    )
}

const estilos = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 10,
        marginVertical: 10,
        width: '45%',
        borderRadius: 10
    },
    caixaTitle: {
        alignItems: 'center',
        flex: 0.1,
        margin: 5,
        title: {
            fontSize: 30,
            fontFamily: 'AveriaLibre-Regular',
            textAlign: 'center',
            color: '#3F92C5',
        }
    },
    caixaDose: {
        alignItems: 'center',
        flex: 1,
        margin: 5,
        padding: 5,
        backgroundColor: '#3F92C5',
        width: '70%',
        alignSelf: 'center',
        dose: {
            color: '#FFFFFF',
            fontSize: 20,
            fontFamily: 'AveriaLibre-Regular',
        }
    },
    caixaData: {
        alignItems: 'center',
        flex: 1,
        margin: 5,
        data: {
            color: '#8B8B8B',
            fontSize: 15,
            fontFamily: 'AveriaLibre-Regular',
        }
        
    },
    caixaImagem: {
        alignItems: 'center',
        flex: 5,
        margin: 5,
        imagem: {
            width: "100%",
            height: 100
        }
    },
    caixaProx: {
        flex: 1,
        margin: 5,
        prox: {
            color: '#FD7979',
            fontSize: 15,
            fontFamily: 'AveriaLibre-Regular',
            alignSelf: 'flex-end',
        }
    }
})

export default Card