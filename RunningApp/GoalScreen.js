import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Pressable, TouchableWithoutFeedback, Keyboard, Animated} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

function SkillLevel () {
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
    </>
  );
}

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
      <SkillLevel/>
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

const Stack = createNativeStackNavigator();
export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="goalScreen">
        <Stack.Screen name="goalScreen" options={{ title: 'Enter Details' }} component={ChooseOptionPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}