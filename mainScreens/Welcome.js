import React from 'react';
import {View, Text, Image} from 'react-native';
import {Button} from "../helperComponents/Utilities.js";
import {welcomeStyles} from "../helperComponents/styles.js";

export default function Welcome ({navigation}) {
  return (
      <View style={welcomeStyles.container}>
        <Image source={require('../images/welcome.png')} style={welcomeStyles.image}/>
        <Text style={welcomeStyles.welcomeText}> Welcome! </Text>
        <Text style={welcomeStyles.paragraph}> Discover the joy of movement with running, a simple step towards a healthy life. </Text>
        <Button onPress={() => navigation.navigate('createAccount')} title="Start" padding={12} alignSelf="center"/>
      </View>
  );
}