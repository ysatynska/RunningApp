import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Pressable, TouchableWithoutFeedback, Keyboard, Animated} from 'react-native';
import StepIndicator from "./StepIndicator";

export default function SkillLevel ({ navigation }) {
    const [selected, setSelected] = useState(null);
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
  
    const radioButtons = skillLevels.map(function (level, index) {
      return (
        <Pressable key={index} style={styles.radioButtonContainer} onPress={() => setSelected(level)}>
          <View style={[
            styles.radioButton,
            selected === level ? styles.radioButtonSelected : null
          ]} />
          <Text style={styles.radioButtonText}>
            {level}
          </Text>
        </Pressable>
      );
    });
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}> What is your current skill level? </Text>
        {radioButtons}
        <View style={styles.footer}>
          <StepIndicator currentStep = {2}/>
          <Pressable onPress={() => navigation.navigate('availability')} style={styles.button}>
              <Text style={styles.buttonText}> Next </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
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
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      padding: 10,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginVertical: 50,
      color: '#1c5253'
    },
    optionButton: {
      backgroundColor: '#e0e0e0',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    optionPressed: {
      backgroundColor: '#b0b0b0',
    },
    optionText: {
      fontSize: 18,
    },
    selectedOption: {
      backgroundColor: '#b0b0b0',
    },
    selectionText: {
      marginTop: 20,
      fontSize: 18,
    },
    radioButton: {
      height: 20,
      width: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#000',
      margin: 20,
      padding: 2,
    },
    radioButtonText: {
      fontSize: 28,
      color: '#1c5253'
    },
    radioButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    radioButtonSelected: {
      backgroundColor: '#01CFEE',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      width: 200,
    },
  });