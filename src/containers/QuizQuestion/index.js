import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import Header from '../../components/HeaderCustom';

import LoginAction from '../../store/Actions/LoginAction';
import texts from '../../utils/Convertor/translation.json';
class QuizQuestion extends React.Component {
  state = {
    visible: 'collocation',
    visible1: 'vocabulary',

    questionNum: 1,
    question: [],
    rightAswer: '',
    text: ['Sorry to hear that. Hope you get better soon.'],
    disabled: false,
    score: 0,
    loader: false,
  };
  componentDidMount = () => {
    const select = this.props.navigation.getParam('select');

    if (select == 'collocation') {
      this.setState({loader: true});
      firestore()
        .collection('quiz')
        .where('question', '!=', '')
        .onSnapshot(querySnapshot => {
          var cities = [];
          querySnapshot.forEach(doc => {
            cities.push(doc.data());
          });

          this.setState({question: cities, loader: false});
        });
    } else {
      this.setState({loader: true});
      firestore()
        .collection('vocabularyQuiz')
        .where('question', '!=', '')
        .onSnapshot(querySnapshot => {
          var cities = [];
          querySnapshot.forEach(doc => {
            cities.push(doc.data());
          });

          this.setState({question: cities, loader: false});
        });
    }
  };
  incrementCount = () => {
    console.log(0 + 5);
    this.setState(prevState => ({score: prevState.score + 5}));
  };
  decrementCount = () => {
    this.setState(prevState => ({score: prevState.score + 0}));
  };
  newquestion = (item, data) => {
    if (data.choice[item] === 'false') {
      this.decrementCount();
      this.setState({rightAswer: false, disabled: true});
    } else {
      this.incrementCount();
      this.setState({rightAswer: true, disabled: true});
    }
  };
  nextQuestion = () => {
    const {score} = this.state;
    console.log(this.state.questionNum, 'question num');
    var select = this.props.navigation.getParam('select');
    console.log(select, 'select');

    if (
      this.state.questionNum === this.state.question.length &&
      select === 'collocation'
    ) {
      firestore()
        .collection('users')
        .doc(this.props.userdata?.data?.uid)
        .set(
          {
            collocationQuiz: score,
          },
          {merge: true},
        )
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch(error => {
          console.error('Error writing document: ', error);
        });
      this.props.navigation.navigate('Result', {score});
    } else if (
      this.state.questionNum === this.state.question.length &&
      select == 'vocabulary'
    ) {
      firestore()
        .collection('users')
        .doc(this.props.userdata?.data?.uid)
        .set(
          {
            vocabularyQuiz: score,
          },
          {merge: true},
        )
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch(error => {
          console.error('Error writing document: ', error);
        });

      this.props.navigation.navigate('Result', {score});
    } else {
      this.setState({
        questionNum: this.state.questionNum + 1,
        rightAswer: '',
        disabled: false,
      });
    }
  };
  render() {
    const {
      visible,
      visible1,
      loader,
      question,
      text,
      choice,
      questionNum,
      rightAswer,
    } = this.state;
    const {lang} = this.props;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: 'white',
        }}>
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
        <Header back logoutvisible navigation={this.props.navigation} />

        <Text
          style={{
            paddingLeft: 20,
            marginTop: 20,
            fontFamily: 'Quicksand-Bold',
            fontSize: 20,
            letterSpacing: 2,
          }}>
          {' '}
          {questionNum < 21
            ? texts[lang].question + ' ' + questionNum + `/${question.length}`
            : null}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
            fontFamily: 'Quicksand-Medium',
          }}>
          {questionNum == 21 ? 'Quiz Ended' : null}
        </Text>
        {question.map((data, i) => {
          var questionstring = data.question.split(' B:');

          if (questionNum == data.id)
            return (
              <View style={{paddingHorizontal: 25, paddingVertical: 15}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    fontFamily: 'Quicksand-Medium',
                  }}>
                  {questionstring[0]} {'\n'}
                  {questionstring[1] ? `B:${questionstring[1]}` : null}
                </Text>

                {Object.keys(data.choice).map((item, index) => {
                  return (
                    <TouchableOpacity
                      disabled={this.state.disabled}
                      onPress={() => this.newquestion(item, data)}
                      style={{
                        padding: 10,
                        backgroundColor: '#4BD3A2',
                        marginTop: 20,
                        borderRadius: 6,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '500',
                          fontFamily: 'Quicksand-Medium',
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

              </View>
            );
          else null;
        })}
        <TouchableOpacity
          onPress={() => this.nextQuestion()}
          style={{
            padding: 10,
            backgroundColor: '#36A0FD',
            width: '30%',
            alignSelf: 'flex-end',
            marginRight: 30,
            borderRadius: 4,
            marginTop: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Quicksand-Medium',

            }}>
            {/* Next */}
            {texts[lang].next}
          </Text>
        </TouchableOpacity>
        <View style={{alignSelf: 'center', marginTop: 50}}>
          {rightAswer.length == 0 ? null : (
            <FontAwesome5
              name={rightAswer ? 'check-circle' : 'window-close'}
              color={rightAswer ? 'green' : 'red'}
              size={25}
            />
          )}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {

  return {
    userdata: state.User.data,
    lang: state.User.languageCode.languageCode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    LoginData: userdata => dispatch(LoginAction.getLogin(userdata)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizQuestion);
