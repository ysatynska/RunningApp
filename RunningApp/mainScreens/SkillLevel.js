import React, {useMemo, useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Pressable, TouchableWithoutFeedback, Keyboard, Animated} from 'react-native';
import StepIndicator from "../helperComponents/StepIndicator";
import RadioGroup from 'react-native-radio-buttons-group';

export default function SkillLevel ({ navigation }) {
    const [selected, setSelected] = useState(null);
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
  
    const radioButtons = skillLevels.map((level, index) => (
      {
        id: index,
        label: skillLevels[index],
        value: skillLevels[index]
      }
    ));
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}> My Skill Level is: </Text>
        <RadioGroup 
            radioButtons={radioButtons} 
            onPress={setSelected}
            selectedId={selected}
        />
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
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      padding: 10,
    },
    title: {
      fontSize: 35,
      marginBottom: 20,
      color: '#747474'
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
      margin: 10,
      padding: 2,
    },
    radioButtonText: {
      fontSize: 30,
      color: '#747474'
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
    nextButton: {
      backgroundColor: '#FF5953',
      padding: 10,
      borderRadius: 5,
      margin: 20
    },
  });