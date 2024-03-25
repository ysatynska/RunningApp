import React, {useState, useEffect, useRef} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// import { ChooseOptionPage } from './GoalScreen.js';
import SkillLevel from './SkillLevel.js';

const Stack = createNativeStackNavigator();
export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="goalScreen">
        <Stack.Screen name="goalScreen" options={{ title: 'Enter Details' }} component={SkillLevel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}