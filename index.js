/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
TrackPlayer.registerPlaybackService(() => require('./services'));
