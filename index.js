/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Inicial from './src/screens/Inicial';
import Home from './src/screens/Home'
import EditarVacina from './src/screens/EditarVacina';
import CriarConta from './src/screens/CriarConta';
import RecuperarSenha from './src/screens/RecuperarSenha';
import Line from './src/components/Line';
import LineAll from './src/components/LineAll';
import CheckBoxDoses from './src/components/CheckBoxDoses';
import Navigation from './src/screens/Navigation'
import Burger from './src/components/Burger';
import Modal from './src/components/Modal';
import Proximas from './src/screens/Proximas';

AppRegistry.registerComponent(appName, () => Navigation);
//AppRegistry.registerComponent(appName, () => Proximas);