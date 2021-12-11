import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import TrackPlayer from 'react-native-track-player';
import {connect} from 'react-redux';
import Tab1 from '../../assets/learn-image.svg';
import Header from '../../components/HeaderCustom';
import texts from '../../utils/Convertor/translation.json';
const OpenCC = require('opencc-js');
function Learn(props) {
  const [visible, setvisible] = useState('');
  const [buttontext, setbuttontext] = useState([]);
  const [loader, setloader] = useState('');

  useEffect(() => {
    setloader(true);
    firestore()
      .collection('topics')
      .where('name', '!=', '')
      .onSnapshot(querySnapshot => {
        var cities = [];
        querySnapshot.forEach(doc => {
          cities.push(doc.data());
        });
        setbuttontext(cities);
        setloader(false);
      });
  }, []);
  const fetchData = () => {
    TrackPlayer.stop();
    SoundPlayer.stop();
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [props.navigation]);

  return (
    <View
      style={{flex: 1, justifyContent: 'flex-start', backgroundColor: 'white'}}>
      {loader ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 99,
            justifyContent: 'center',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : null}
      <Header logoutvisible navigation={props.navigation} />
      <Text
        style={{
          paddingLeft: 20,
          marginTop: 20,
          fontSize: 22,
          fontFamily: 'Quicksand-Bold',
        }}>
        Learn
      </Text>
      <Text
        style={{
          paddingLeft: 20,
          color: 'gray',
          fontSize: 16,
          letterSpacing: 4,
          fontWeight: '600',
          fontFamily: 'Quicksand-Medium',
        }}>
        {/* 學 習 內 容 */}
        {texts[props.lang].learningContent}
      </Text>
      {/* Learning Content */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          style={{
            borderBottomColor: visible == 'collocation' ? 'gray' : '#D8D6D6',
            borderBottomWidth: 2,
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: 'gray',
              textAlign: 'left',
              fontFamily: 'Quicksand-Medium',
            }}>
            English at work
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: visible == 'collocation' ? '#D8D6D6' : 'gray',
            borderBottomWidth: 2,
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              fontFamily: 'Quicksand-Medium',
              letterSpacing: 4,
            }}>
            {/* 職 場 英 語 */}
            {texts[props.lang].jobFieldEnglish}
          </Text>
          {/* Job Field English */}
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Tab1 width={'100%'} height={150} />
      </View>
      <FlatList
        data={buttontext}
        numColumns={3}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 20,
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Topic', {item})}
              style={{
                padding: 6,
                marginTop: 10,
                marginHorizontal: 3,
                borderRadius: 4,
                width: 110,
                justifyContent: 'center',
                backgroundColor: '#2CBCEE',
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  fontFamily: 'Quicksand-Medium',
                }}>
                  {props.lang != 'hk'
                        ? OpenCC.Converter({from: 'hk', to: 'cn'})(item.cname)
                        : item.cname}
                {/* {item.cname} */}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

function mapStateToProps(state) {
  console.log(state, 'this is login state');
  return {
    audio: state,
    lang: state.User.languageCode.languageCode,
  };
}

export default connect(mapStateToProps, null)(Learn);
