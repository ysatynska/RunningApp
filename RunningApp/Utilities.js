import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export function Button ({onPress, title}) {
    return (
        <View>
            <Pressable onPress={onPress} style={styles.button}>
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
            <Image source={invalidUsername || invalidPassword || invalidName ? require('./assets/loginError.png') : require('./assets/login.png')} style={styles.image}></Image>
        </View>
    );
}
// these styls are the exact (!) copy of styles in CreateAccount and LoginScreent!

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      alignItems: 'center',
    },
    createAccount: {
      fontSize: 25,
      marginTop: 20,
      marginLeft: 5
    },
    input: {
      height: 40,
      marginTop: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 50,
    },
    button: {
      backgroundColor: '#FF5953',
      padding: 8,
      borderRadius: 50,
      alignItems: 'center',
      marginTop: 15,
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
    link: {
      color: '#0645AD',
      fontSize: 15,
    },
    text: {
      fontSize: 15,
      color: 'gray',
      marginLeft: 5,
    },
    error: {
      fontSize: 16,
      color: 'red',
      marginLeft: 5
    },
    linkContainer: {
      marginTop: 8
    },
    icon: {
      position: 'absolute',
      right: 10,
      top: 6,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });