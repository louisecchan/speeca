import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import TrackPlayer, {Capability} from 'react-native-track-player';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import Header from '../../components/HeaderCustom';

import LoginAction from '../../store/Actions/LoginAction';

const OpenCC = require('opencc-js');
TrackPlayer.updateOptions({
  stopWithApp: true,
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.Stop,
  ],

  compactCapabilities: [Capability.Play, Capability.Pause],
});
class Topic extends React.Component {
  state = {
    visible: 'collocation',
    TopicAudios: [],
    loader: false,
    topicName: '',
    uniqueurl: '',
  };

  componentDidMount = async () => {
    this.setState({loader: true});
    const data = this.props.navigation.getParam('item');
    this.setState({topicName: data.name});
    firestore()
      .collection('topics')
      .doc(data.docid)
      .collection('audioFiles')
      .where('data', '!=', '')
      .onSnapshot(async querySnapshot => {
        var cities = [];
        querySnapshot.forEach(doc => {
          cities.push(doc.data().data);
        });

        const a = cities.map((data, i) => {
          return data;
        });

        const array = [];
        for (var i = 0; i < a[0].length; i++) {
          var newdata = {
            id: Math.random().toString(),
            url: a[0][i].audio,
            ename: a[0][i].ename,
            cname: a[0][i].cname,
            title: a[0][i].cname,
            artist: a[0][i].ename,
          };
          array.push(newdata);
          SoundPlayer.loadUrl(a[0][i].audio);
        }

        this.setState({TopicAudios: array});
        this.setState({loader: false});
      });
  };

  setUpTrackPlayer = async data => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(data);
    } catch (e) {
      alert(e);
    }
  };
  playAudio = async data => {
    if (Platform.OS == 'android') {
      this.setState({loader: true});

      this.props.AudioData(await TrackPlayer.getState());
      this.setUpTrackPlayer(data);
      TrackPlayer.destroy();

      TrackPlayer.play(data);
      this.setState({loader: false});
    } else {
      try {
        this.setState({loader: true});
        console.log(data.url, 'urll');
        console.log(this.state.uniqueurl, 'uniqueurl');
        this.setState({uniqueurl: data.url});

        SoundPlayer.playUrl(data.url);
      } catch (e) {
        console.log(`cannot play the sound file`, e);
      }
      console.log(data, 'this is loaderrrrr');

      const info = await SoundPlayer.getInfo();
      console.log('getInfo', info);
      if (info) {
      }
      this.setState({loader: false});
    }
  };
  render() {
    const {
      visible,
      visible1,
      buttontext,
      topicList,
      TopicAudios,
      loader,
      topicName,
    } = this.state;

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header
          stopaudio
          back
          logoutvisible
          navigation={this.props.navigation}
        />

        <ScrollView>
          {loader ? (
            <View
              style={{
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : null}
          <View style={{paddingTop: 10}}>
            {TopicAudios.map((data, index) => {
              return (
                <TouchableOpacity
                  onPress={() => this.playAudio(data)}
                  key={index}
                  style={{
                    padding: 20,

                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: 'Quicksand-Medium',
                        fontWeight: '600',
                        width: 200,
                      }}>
                      {data.ename}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontFamily: 'Quicksand-Medium',
                        color: '#1E74E9',
                        fontSize: 13,
                        fontWeight: '600',
                        width: 200,
                      }}>
                      {this.props.lang != 'hk'
                        ? OpenCC.Converter({from: 'hk', to: 'cn'})(data.cname)
                        : data.cname}
                    </Text>
                  </View>
                  {loader && this.state.uniqueurl == data.url ? (
                    <View
                      style={{
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'rgba(0,0,0,0.3)',
                      }}>
                      <ActivityIndicator />
                    </View>
                  ) : (
                    <MaterialIcons name="campaign" size={24} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    audio: state,
    lang: state.User.languageCode.languageCode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AudioData: audio => dispatch(LoginAction.getAudio(audio)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Topic);
