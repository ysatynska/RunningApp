import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Animated } from 'react-native';

const ChooseOptionPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputOpacity = useRef(new Animated.Value(0)).current;

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setInputVisible(true);
    Animated.timing(inputOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wharrt would you like to improve?</Text>
      <Pressable
        style={({ pressed }) => [
          styles.optionButton,
          pressed && styles.optionPressed,
          selectedOption === 'Time' && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect('Time')}
      >
        <Text style={styles.optionText}>
            {'Time'}
          </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.optionButton,
          pressed && styles.optionPressed,
          selectedOption === 'Distance' && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect('Distance')}
      >
        <Text style={styles.optionText}>
            {'Distance'}
          </Text>
      </Pressable>
      {inputVisible && (
        <Animated.View style={{ opacity: inputOpacity }}>
          <TextInput
            style={styles.input}
            placeholder="Enter value"
            onChangeText={(text) => setInputValue(text)}
          />
        </Animated.View>
      )}
    </View>
  );
};

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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 200,
  },
});

export default ChooseOptionPage;