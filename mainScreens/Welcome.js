import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {Button} from "../helperComponents/Utilities.js";

export default function Welcome ({navigation}) {
  return (
      <View style={styles.container}>
        <Image source={require('../images/welcome.png')} style={styles.image}/>
        <Text style={styles.welcomeText}> Welcome! </Text>
        <Text style={styles.paragraph}> Discover the joy of movement with running, a simple step towards a healthy life. </Text>
        <Button onPress={() => navigation.navigate('createAccount')} title="Start" padding={12}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  welcomeText: {
    fontSize: 32,
    color: '#01CFEE',
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    padding: 10,
    margin: 20
  },
  paragraph: {
    textAlign: 'center',
    color: "#A6A6A6",
    padding: 20,
    fontSize: 17
  }
});