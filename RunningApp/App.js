import React, {useState, useEffect, useRef} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ChooseOptionPage from './GoalScreen.js';
import Welcome from './Welcome.js';
import SkillLevel from './SkillLevel.js';
import Availability from './Availability.js';
import {StyleSheet} from 'react-native';
import {CreateAccount, LoginScreen, WelcomeBack} from './LoginScreen.js';

const Stack = createNativeStackNavigator();
export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" options={{...styles.headerStyle, title: 'Login'}} component={LoginScreen} />
        <Stack.Screen name="createAccount" options={{...styles.headerStyle, title: 'Create Account'}} component={CreateAccount} />
        <Stack.Screen name="welcomeBack" options={{...styles.headerStyle, title: 'Welcome Back'}} component={WelcomeBack} />
        <Stack.Screen name="welcome" options={{...styles.headerStyle, title: 'Welcome'}} component={Welcome} />
        <Stack.Screen name="goalScreen" options={{...styles.headerStyle, title: 'Goal'}} component={ChooseOptionPage} />
        <Stack.Screen name="skillLevel" options={{...styles.headerStyle, title: 'Skill Level'}} component={SkillLevel} />
        <Stack.Screen name="availability" options={{...styles.headerStyle, title: 'Select Availability'}} component={Availability} />
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
