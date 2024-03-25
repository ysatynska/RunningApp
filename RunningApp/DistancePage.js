import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const DistancePage = () => {
  const [goalDistance, setGoalDistance] = useState('');

  const handleSaveGoalDistance = () => {
    // You can implement logic to save the goal distance here
    console.log('Goal distance saved:', goalDistance);
    // For example, you can send it to a server or save it locally
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distance</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter goal distance"
        keyboardType="numeric"
        value={goalDistance}
        onChangeText={text => setGoalDistance(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveGoalDistance}>
        <Text style={styles.buttonText}>Save Goal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
//    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DistancePage;