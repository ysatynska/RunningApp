import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ChooseOptionPage from './GoalScreen.js';
import Welcome from './Welcome.js';
import SkillLevel from './SkillLevel.js';
import Availability from './Availability.js';
import {StyleSheet} from 'react-native';
import LoginScreen from './LoginScreen.js';
import CreateAccount from './CreateAccount.js';
import Profile from './Profile3.js';

const Stack = createNativeStackNavigator();
export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen name="welcome" options={{...styles.headerStyle, title: 'Welcome'}} component={Welcome} />
        <Stack.Screen name="createAccount" options={{...styles.headerStyle, title: 'Sign Up'}} component={CreateAccount} />
        <Stack.Screen name="login" options={{...styles.headerStyle, title: 'Sign In'}} component={LoginScreen} />
        <Stack.Screen name="goalScreen" options={{...styles.headerStyle, title: 'Choose a Goal'}} component={ChooseOptionPage} />
        <Stack.Screen name="skillLevel" options={{...styles.headerStyle, title: 'Skill Level'}} component={SkillLevel} />
        <Stack.Screen name="availability" options={{...styles.headerStyle, title: 'Select Availability'}} component={Availability} />
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
