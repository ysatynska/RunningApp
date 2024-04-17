import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Button ({onPress, title, padding, marginBottom = 0, marginTop = 15}) {
    return (
        <View>
            <Pressable onPress={onPress} style={[styles.button, {padding, marginBottom, marginTop}]}>
                <Text style={styles.buttonText}> {title} </Text>
            </Pressable>
        </View>
    );
}

export function Error ({message}) {
    return (
      <View>
        <Text style={styles.error}>{message}</Text>
      </View>
    );
}

export function LoginImage ({invalidUsername, invalidPassword, invalidName = false}) {
    return (
        <View style={styles.header}>
            <Image source={invalidUsername || invalidPassword || invalidName ? require('../images/loginFail.png') : require('../images/loginSuccess.png')} style={styles.image}></Image>
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
  return (
    <View style={styles.stepIndContainer}>
      {[1, 2, 3].map(step => (
        <View
          key={step}
          style={[
            styles.circle,
            currentStep === step && styles.highlightedCircle,
          ]}
        />
      ))}
    </View>
  );
};


// these styls are the exact (!) copy of the same ones in CreateAccount and LoginScreent!

const styles = StyleSheet.create({
    header: {
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#FF5953',
      borderRadius: 50,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
    },
    image: {
      width: 200,
      height: 200,
      padding: 10,
      margin: 20
    },
    error: {
      fontSize: 16,
      color: 'red',
      marginLeft: 5
    },
    stepIndContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: '#ccc',
      margin: 5,
    },
    highlightedCircle: {
      backgroundColor: '#FF5953',
    },
  });