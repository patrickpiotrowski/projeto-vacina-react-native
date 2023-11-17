import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Inicial from "./Inicial";
import Home from './Home';
import CriarConta from './CriarConta';
import RecuperarSenha from './RecuperarSenha';
import EditarVacina from './EditarVacina';
import CriarVacina from './CriarVacina';
import Proximas from "./Proximas";
import { Provider } from "react-redux";
import { store } from "../redux/store";


const Stack = createStackNavigator()

const Navigation = () => {
    return (

        <Provider store={store}>

            <NavigationContainer>
                <Stack.Navigator initialRouteName='Inicial' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Inicial' component={Inicial} />
                    <Stack.Screen name='Minhas vacinas' component={Home} />
                    <Stack.Screen name='Criar conta' component={CriarConta} />
                    <Stack.Screen name='Recuperar senha' component={RecuperarSenha} />
                    <Stack.Screen name='Editar Vacina' component={EditarVacina} />
                    <Stack.Screen name='Criar Vacina' component={CriarVacina} />
                    <Stack.Screen name='Proximas' component={Proximas} />
                </Stack.Navigator>
            </NavigationContainer>
        
        </Provider>
    )
}

export default Navigation