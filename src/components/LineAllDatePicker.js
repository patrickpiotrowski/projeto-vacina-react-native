// Importação
import { View, Text, StyleSheet, TextInput, LeftContent, Button, TouchableOpacity, StatusBar, Image, ImageBackground } from 'react-native'
import { Fragment, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import CalendarIcon from '../assets/images/calendar.png'

// Definição
const LineAllDatePicker = (props) => {
    const [open, setOpen] = useState(false)

    return (
        <View style={estilos.todo}>
            <View style={estilos.linha1}>
                <View style={estilos.caixaText}>
                    <Text style={estilos.text}>{props.label} </Text>
                </View>

                <View style={estilos.caixaInput}>
                    <TouchableOpacity style={estilos.touchable} onPress={() => setOpen(true)}>
                        <View style={estilos.caixaData}>
                            <Text style={{fontSize: 20}}> {props.value.getDate()}/{props.value.getMonth() + 1}/{props.value.getFullYear()}</Text>
                        </View>
                        <View>
                            <Image style={estilos.imagem} source={CalendarIcon}></Image>
                        </View>
                        <DatePicker
                            modal
                            open={open}
                            date={props.value}
                            onConfirm={(date) => {
                                setOpen(false)
                                props.func(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                            mode='date'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}


const estilos = StyleSheet.create({
    caixaData: {
        marginRight: 15  
    },
    imagem: {
        width: 30,
        height: 30
    },
    touchable: {
        fontFamily: 'AveriaLibre-Regular',
        backgroundColor: 'white',
        width: '100%',
        fontSize: 20,
        padding: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    todo: {
        flex: 1,
    },
    linha1: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    text: {
        fontFamily: 'AveriaLibre-Regular',
        color: 'white',
        fontSize: 20,
    },
    caixaInput: {
        flex: 7,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    caixaText: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
})


export default LineAllDatePicker