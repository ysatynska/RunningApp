import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './ThemeContext.js';
import { getStyles } from './styles.js';
import {utilitiesStyles, staticUtilitiesStyles} from "../helperComponents/styles.js";

export function Button ({onPress, title, padding, marginBottom = 0, marginTop = 15, alignSelf = "auto"}) {
  // Grab dynamic theme
  // const { theme } = useTheme();
  // const styles = getStyles(theme);

    return (
        <View>
            <Pressable onPress={onPress} style={[utilitiesStyles.button, {padding, marginBottom, marginTop, alignSelf}]}>
                <Text style={utilitiesStyles.buttonText}> {title} </Text>
            </Pressable>
        </View>
    );
}

export function Error ({message}) {
  // Grab dynamic theme
  // const { theme } = useTheme();
  // const styles = getStyles(theme);

    return (
      <View>
        <Text style={staticUtilitiesStyles.error}>{message}</Text>
      </View>
    );
}

export function LoginImage ({invalidUsername, invalidPassword, invalidName = false}) {
  // Grab dynamic theme
  // const { theme } = useTheme();
  // const styles = getStyles(theme);

    return (
        <View>
            <Image source={invalidUsername || invalidPassword || invalidName ? require('../images/loginFail.png') : require('../images/loginSuccess.png')} style={staticUtilitiesStyles.loginImage}></Image>
        </View>
    );
}

export async function saveUserAsync (user) {
  try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem(user.username, jsonValue);
  } catch (e) {
      console.log(e);
  }
};

export function roundToTwoDecimals(num) {
  const rounded = Number(num.toFixed(2));
  // Check if the rounded value is an integer by comparing it to its integer part
  if (rounded === Math.floor(rounded)) {
      return Math.floor(rounded); // or just return rounded
  } else {
      return rounded;
  }
}

export const StepIndicator = ({ currentStep }) => {
  // Grab dynamic theme
  // const { theme } = useTheme();
  // const styles = getStyles(theme);
  
  return (
    <View style={staticUtilitiesStyles.stepIndContainer}>
      {[1, 2, 3].map(step => (
        <View
          key={step}
          style={[
            utilitiesStyles.circle,
            currentStep === step && utilitiesStyles.highlightedCircle,
          ]}
        />
      ))}
    </View>
  );
};