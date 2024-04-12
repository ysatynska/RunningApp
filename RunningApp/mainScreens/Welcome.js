import React from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';

export default function Welcome ({navigation}) {
  return (
      <View style={styles.container}>
        <Image source={require('../images/welcome.png')} style={styles.image}/>
        <Text style={styles.welcomeText}> Welcome! </Text>
        <Text style={styles.paragraph}> Discover the joy of movement with running, a simple step towards a healthy life. </Text>
        <Pressable onPress={() => navigation.navigate('createAccount')} style={styles.button}>
            <Text style={styles.buttonText}> Start </Text>
        </Pressable>
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
    color: '#01CFEE'
  },
  button: {
    backgroundColor: '#FF5953',
    padding: 10,
    borderRadius: 5,
    margin: 20
  },
  buttonText: {
    color: 'white', 
    fontSize: 20
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