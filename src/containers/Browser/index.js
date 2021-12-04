import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';

class Browser extends React.Component {
    LoadingIndicatorView() {
        return <ActivityIndicator  size='large' style={styles.ActivityIndicatorStyle} />
      }
  render() {
    const { params } = this.props.navigation.state
    const {navigation,mode} = this.props;
    return (
        <View style={{flex:1,justifyContent:'flex-start',}}>

             <View style={{backgroundColor:"#fff",
             height:Platform.OS=='ios'? 70:StatusBar.currentHeight+ 70,
           
             paddingTop:Platform.OS=='ios'? 30:StatusBar.currentHeight,
             justifyContent:'center',paddingHorizontal:20,
          
             }}>
             <TouchableOpacity onPress={()=>navigation.goBack()}>
                  <Icon name="arrow-back-outline" size={22} />
              </TouchableOpacity>
               <Text></Text>
             </View>
            <WebView 
            source={{ uri: params.link }}
            renderLoading={this.LoadingIndicatorView}
            startInLoadingState={true}
            />
        </View>
    )

  }
}


export default Browser;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:"center",
    backgroundColor:'white'
  }
});