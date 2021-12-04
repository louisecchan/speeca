import React from 'react';
import {
  Animated, Easing, StyleSheet, View
} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import { connect } from 'react-redux';

const size = 20;

class Splash extends React.Component {
  animation = new Animated.Value(0);
  componentDidMount() {
    console.log('localize', RNLocalize.getLocales());
    const data = {
      country: RNLocalize.getCountry(),
      languageCode: RNLocalize.getCountry() == 'HK' ? 'hk' : 'cn',
 
    };
    this.props.dispatch({type: 'SET_COUNTRY', payload: data});
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 1000);
    Animated.loop(
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }
  render() {

    const angleValue = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '700deg'],
    });
    return (
   
      <View style={styles.container}>
  
        <Animated.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            transform: [
              {rotate: angleValue},
              {translateX: -size},
              {translateY: -size},
            ],
          }}>
          <View>
            <View
              style={{
                ...styles.item,
                backgroundColor: '#299AFF',
                top: size + 10,
              }}
            />
            <View
              style={{
                ...styles.item,
                backgroundColor: '#299AFF',
                left: size + 10,
              }}
            />
            <View
              style={{
                ...styles.item,
                backgroundColor: '#299AFF',
                top: size + 10,
                left: size + 10,
              }}
            />
            <View style={{...styles.item, backgroundColor: '#299AFF'}} />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};
export default connect(null, mapDispatchToProps)(Splash);
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  item: {
    width: size,
    height: size,
    position: 'absolute',
    borderRadius: size / 2,
  },
});
