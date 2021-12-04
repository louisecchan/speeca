//Navigations here
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
//Screens
import { AppleAge, Browser, Class, ClassUserInfo, Dashboard, EducationLevel, ForgetPass, GetInTouch, Learn, Login, Quiz, QuizQuestion, Resources, Result, Signup, Splash, Topic } from './containers';
import DrawerComp from './containers/DrawerComp';



const SplashStack = createStackNavigator(
  {
    Splash: {screen: Splash},
  },

  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);
const LoginStack = createStackNavigator(
  {
    Login: {screen: Login,
      navigationOptions:{
        headerShown:false
      }},
    Signup: {screen: Signup,
      navigationOptions:{
        headerShown:false,
      }},
      AppleAge: {screen: AppleAge,
        navigationOptions:{
          headerBackTitle: false,
          title:false
        }},
    ForgetPass: {screen: ForgetPass,
    navigationOptions:{
      headerBackTitle: false,
      title:false
    }},
  },
  {
    initialRouteName: 'Login',
    // headerMode: 'none',
  },
);
const MainStack = createStackNavigator(
  {
    Dashboard: {screen: Dashboard,
    navigationOptions:{
      headerShown:false,
      
    }},
    Quiz: {screen: Quiz,
      navigationOptions:{
        headerShown:false
      }},
    EducationLevel: {screen: EducationLevel,
      navigationOptions:{
        headerShown:false
      }},
    QuizQuestion: {screen: QuizQuestion,
      navigationOptions:{
        headerShown:false
      }},
    Result: {screen: Result,
      navigationOptions:{
        headerShown:false
      }},
    Learn: {screen: Learn,
      navigationOptions:{
        headerShown:false
      }},
    Topic: {screen: Topic,
      navigationOptions:{
        headerShown:false
      }},
    Class: {screen: Class,
      navigationOptions:{
        headerShown:false
      }},
      ClassUserInfo: {screen: ClassUserInfo,
        navigationOptions:{
          headerShown:false
        }},
    Resources: {screen: Resources,
      navigationOptions:{
        headerShown:false
      }},
    GetInTouch: {screen: GetInTouch,
      navigationOptions:{
        headerShown:false
      }},

    Browser: {screen: Browser,
      navigationOptions: ({ navigation }) => ({
        headerShown:false

  })},
  },
  {
    initialRouteName: 'Dashboard',

  },
);
const showDrawer=false;
const DrawerNavigator = createDrawerNavigator(
  {
  Dashboard:MainStack
},
{
  contentComponent:(props)=><DrawerComp  {...props}/>,
  initialRouteName:"Dashboard",
  overlayColor:0.5,

}
);


const RootStack = createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashStack,
      Login:LoginStack,
     DrawerNavigator: DrawerNavigator,
      App: MainStack,

    },
    {
      initialRouteName: 'Splash',
    },
  ),
);

export default RootStack;
