import React, {useMemo, useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Pressable, TouchableWithoutFeedback, Keyboard, Animated} from 'react-native';
import StepIndicator from "./StepIndicator";
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
          <Pressable onPress={() => navigation.navigate('availability')} style={styles.nextButton}>
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
      marginVertical: 20,
      marginHorizontal: 10,
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
    nextButton: {
      backgroundColor: '#FF5953',
      padding: 10,
      borderRadius: 5,
      margin: 20
    },
  });