import React, {useState, useEffect, useRef} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ChooseOptionPage from './GoalScreen.js';
import Welcome from './Welcome.js';
import SkillLevel from './SkillLevel.js';
import {StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();
export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen name="welcome" options={{...styles.headerStyle, title: 'Welcome'}} component={Welcome} />
        <Stack.Screen name="goalScreen" options={{...styles.headerStyle, title: 'What is Your Goal?'}} component={ChooseOptionPage} />
        <Stack.Screen name="skillLevel" options={{...styles.headerStyle, title: 'Skill Level'}} component={SkillLevel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    headerStyle: {
      backgroundColor: '#01CFEE'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    }, 
  }
});