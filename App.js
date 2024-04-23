import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ChooseGoal from './mainScreens/ChooseGoal.js';
import Welcome from './mainScreens/Welcome.js';
import SkillLevel from './mainScreens/SkillLevel.js';
import Availability from './mainScreens/Availability.js';
import { screenOptionsStyles } from './helperComponents/styles.js';
import LoginScreen from './mainScreens/LoginScreen.js';
import CreateAccount from './mainScreens/CreateAccount.js';
import Profile from './mainScreens/Profile.js';
import { ThemeProvider } from './helperComponents/ThemeContext.js';
import Settings from './mainScreens/Settings.js';
import { UserProvider } from './helperComponents/UserContext';

const Stack = createNativeStackNavigator();
export default function App () {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="welcome" screenOptions={screenOptionsStyles}>
          <Stack.Screen name="welcome" options={{ title: 'Welcome'}} component={Welcome} />
          <Stack.Screen name="createAccount" options={{ title: 'Sign Up'}} component={CreateAccount} />
          <Stack.Screen name="login" options={{ title: 'Sign In'}} component={LoginScreen} />
          <Stack.Screen name="chooseGoal" options={{ title: 'Choose Goal'}} component={ChooseGoal} />
          <Stack.Screen name="skillLevel" options={{ title: 'Skill Level'}} component={SkillLevel} />
          <Stack.Screen name="availability" options={{ title: 'Availability'}} component={Availability} />
          <Stack.Screen name="profile" options={{ title: 'Profile' }} component={Profile} />
          <Stack.Screen name="settings" options={{ title: 'Settings'}} component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}