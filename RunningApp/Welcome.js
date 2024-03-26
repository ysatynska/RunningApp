import React, {useState} from 'react';
import {View, Switch, StyleSheet, Text, Pressable, TouchableWithoutFeedback, Keyboard, Image} from 'react-native';
import DistancePage from './DistancePage';
import TimePage from './TimePage';

export default function Welcome ({navigation}) {
  return (
      <View style={styles.welcome}>
        <Image source={require('./assets/image.png')} style={styles.image}/>
        <Text style={styles.welcomeText}> Welcome! </Text>
        <Text style={styles.paragraph}> Discover the joy of movement with running, a simple step towards a healthy life. </Text>
        <Pressable onPress={() => navigation.navigate('goalScreen')} style={styles.button}>
            <Text style={{color: 'white', fontSize: 20}}> Start </Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeText: {
    fontSize: 32,
    color: '#01CFEE'
  },
  button: {
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    margin: 20
  },
  image: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 20
  },
  paragraph: {
    textAlign: 'center',
    color: "#A6A6A6",
    padding: 20,
  }
});