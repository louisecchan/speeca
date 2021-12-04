import React from 'react';
import { Dimensions, Image, StatusBar, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SoundPlayer from 'react-native-sound-player';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Device from '../containers/Device';
import LoginAction from '../store/Actions/LoginAction';
class HeaderCustom extends React.Component {
  state={
    logout:''
  }
  logout=()=>{


   this.props.navigation.push("Login")
}

audiostop=()=>{
  this.props.navigation.goBack()
  if(this.props.stopaudio){
    TrackPlayer.stop()
    SoundPlayer.stop()
  }

  
}
  render(){
    const {navigation,title,back,rightIcon,mode,logoutvisible,quizGoBack} = this.props;
    return (
      <View style={{ width: '100%',height:Device.isIphoneX ? 85 : Dimensions.get('window').height>750 ?85: 60,justifyContent:'center',}}>
      <StatusBar barStyle="dark-content" backgroundColor="#7852C8" translucent />
      <View style={{ marginTop: getStatusBarHeight(), padding: 0,paddingHorizontal:15, flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between' }}>
       {
         back ? 
         <TouchableOpacity onPress={()=>quizGoBack? this.props.navigation.navigate("Dashboard"): this.audiostop()}>
         <Icon name="arrow-back-outline" size={22} />
     </TouchableOpacity>
          : 
          <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} style={{}}>
          <Icon name="menu" size={25} />
      </TouchableOpacity>
       }
       {
         <View style={{justifyContent:'center',alignItems:"center",alignSelf:"center"}}>
          <Image source={require("../assets/app-logo.png")} style={{width:120,height:30,marginTop:5}} />
        </View>
       }
      {
          logoutvisible ? 
          <View style={{width:25,height:25}}> 
          {/* <AntDesign name="logout" size={17} /> */}
          </View> : null
       } 
    
      </View>
    </View>
    )
  }
  
}
 
function mapStateToProps(state) {
  return ({
    userdata: state.User.data,
  })
}
function mapDispatchToProps(dispatch) {
  return {
    Logout: (data) => dispatch(LoginAction.getLogout(data)) 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderCustom);

