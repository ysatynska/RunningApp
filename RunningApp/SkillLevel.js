import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Pressable, TouchableWithoutFeedback, Keyboard, Animated} from 'react-native';

export default function SkillLevel ({ navigation }) {
    const [selected, setSelected] = useState(null);
    const skillLevels = ['beginner', 'intermediate', 'advanced'];
  
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
      <>
        {radioButtons}
          <Pressable onPress={() => navigation.navigate('skillLevel')}>
              <Text> Next </Text>
          </Pressable>
      </>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
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
      marginRight: 10,
      padding: 2,
    },
    radioButtonText: {
      fontSize: 16,
      color: '#000',
    },
    radioButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    radioButtonSelected: {
      backgroundColor: 'blue',
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