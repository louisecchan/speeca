import axios from 'axios';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Image1 from "../../assets/dashboard-image.svg";
import Header from '../../components/HeaderCustom';
import texts from '../../utils/Convertor/translation.json';
class Dashboard extends React.Component {
  state = {
    isSelected: false,
    quote: [],
    loader: ''
  }
  
  componentDidMount = async () => {
    this.setState({ loader: true })
    var randNum = Math.floor(Math.random() * 100) + 1;

    await axios.get('https://type.fit/api/quotes')
      .then((response) => {
    
        const a = response.data.slice(1, 102)
        this.setState({ quote: a[randNum] })
        this.setState({ loader: false })
      })
      .catch((error) => {
        this.setState({ loader: false })
        console.log(error);
      })
  }
  render() {
    const { isSelected, quote, loader } = this.state

    const {lang}=this.props
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'white' }}>
        {loader ? <View style={{ position: "absolute", zIndex: 99, justifyContent: 'center', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <ActivityIndicator size="large" color="black" />
        </View> : null
        }
        <Header logoutvisible navigation={this.props.navigation} />
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 34, fontFamily: "Quicksand-Bold" }}>Welcome to {"\n"}SPEECA!</Text>

          <Text style={{ fontSize: 16,color: 'gray', fontFamily: "Quicksand-Medium",letterSpacing:4 }}>{texts[lang].welcomeToOurLearningPlatform}</Text>

        </View>

        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal:10,
        }}>
          <Text style={{ fontSize: 18, color: '#7852C8', textAlign: 'center', fontWeight: '800', fontFamily: "Quicksand-SemiBold" }}>{quote?.text}</Text>
          <Text style={{ fontSize: 12, color: 'black', textAlign: 'center', fontWeight: '500', marginTop: 6, fontFamily: "Quicksand-SemiBold" }}>-{quote?.author}</Text>

        </View>
        <View style={styles.containerMain}>
          <Image1 style={styles.bottomView} width={'100%'} height={200} />
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return ({
    userdata: state.User.data,
    lang:state.User.languageCode.languageCode
  })
}
export default connect(mapStateToProps, null)(Dashboard);



const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 20, 
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
});