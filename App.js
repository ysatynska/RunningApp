import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ChooseGoal from './mainScreens/ChooseGoal.js';
import Welcome from './mainScreens/Welcome.js';
import SkillLevel from './mainScreens/SkillLevel.js';
import Availability from './mainScreens/Availability.js';
import {StyleSheet} from 'react-native';
import LoginScreen from './mainScreens/LoginScreen.js';
import CreateAccount from './mainScreens/CreateAccount.js';
import Profile from './mainScreens/Profile.js';

const Stack = createNativeStackNavigator();
export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen name="welcome" options={{...styles.headerStyle, title: 'Welcome'}} component={Welcome} />
        <Stack.Screen name="createAccount" options={{...styles.headerStyle, title: 'Sign Up'}} component={CreateAccount} />
        <Stack.Screen name="login" options={{...styles.headerStyle, title: 'Sign In'}} component={LoginScreen} />
        <Stack.Screen name="goalScreen" options={{...styles.headerStyle, title: 'Choose Goal'}} component={ChooseGoal} />
        <Stack.Screen name="skillLevel" options={{...styles.headerStyle, title: 'Skill Level'}} component={SkillLevel} />
        <Stack.Screen name="availability" options={{...styles.headerStyle, title: 'Availability'}} component={Availability} />
        <Stack.Screen name="profile" options={{...styles.headerStyle, title: 'Profile'}} component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    headerStyle: {
      backgroundColor: '#01CFEE'
    },
    headerTintColor: 'white'
  }
});
