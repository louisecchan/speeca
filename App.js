/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Container from './src/index'
import {connect,Provider} from 'react-redux';
import {store, persistor} from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react'
import stripe from "tipsi-stripe";

stripe.setOptions({
  // Authorization:"Bearer sk_test_51JeaCvKLjO5zSSsbwKg7t7ivMy8H9fnveUdAlBRPBAPfSVcmwEdEfIG8cheGWyuBvKqRrDvVZqwHVE3HxyKOXsPc00Mj27A8SG"
  publishableKey:"pk_test_51JeaCvKLjO5zSSsbSBAhaMM1BzgrohBnqQAZI6r0XizjJARr6IBML40MvK8vSTNG1mhtG8DtNWIdWUHhvbIG5vkJ00zu7sZ6PC"
})

console.disableYellowBox=true
export default class App extends React.Component {
render(){
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container />
      </PersistGate>
  </Provider>
  );
}
};

