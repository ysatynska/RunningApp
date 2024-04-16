import React, { useState } from 'react';
import {View, Switch, StyleSheet, TextInput, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import StepIndicator from "../helperComponents/StepIndicator";
import { Error } from "../helperComponents/Utilities";

export default function ChooseGoal ({ route, navigation }) {
  const [isDistance, setIsDistance] = useState(false);
  const [minutes, setMinutes] = useState('');
  const [miles, setMiles] = useState('');
  const [error, setError] = useState('');
  const { user } = route.params;

  function handleDistChange (value) {
    setError('');
    if (value < 0) {
      // disallowing negative values for distance.
      value = '0';
    } else if ((value > 15 && !isDistance) || (value > 30 && isDistance)) {
      // capping distance at 30 if Distance and 15 if Time.
      value = isDistance ? '30' : '15';
    }
    setMiles(value);
  }

  function handleMinsChange (value) {
    setError('');
    if (value < 0) {
      // disallowing negative values for minutes.
      value = '0';
    } else if (value > 60) {
      // capping minutes at 60.
      value = '60';
    }
    setMinutes(value);
  }

  function handleNext () {
    if (!isDistance && Number(miles)/Number(minutes) >= .5) {
      setError("With the given parameters, you speed would exceed the fastest someone ever ran ("  + (Number(miles)/Number(minutes)).toFixed(2) + " miles/minute vs fastest 0.463 miles/minute).");
    
    } else if (!isDistance && Number(miles)/Number(minutes) < .05) {
      setError("With the given parameters, you speed would be below walking distance (" + (Number(miles)/Number(minutes)).toFixed(3) + " miles/minute vs walking 0.05 miles/minute).");
    
    } else if (miles != '0' && miles != '' && (!isDistance ? minutes != '' : true)) {
      user.goal = {miles: Number(miles), minutes: (minutes == '' ? 0 : Number(minutes))};
      navigation.navigate('skillLevel', {user: user});
    
    } else {
      setError("Please fill out all fields. Miles cannot be 0.");
    }
  }
  function toggleSwitch () {
    setIsDistance(previousState => !previousState);
    setMiles('');
    setMinutes('');
    setError('');
  }

  function handlePress () {
    Keyboard.dismiss();
    setError('');
  }
    
  return (
    <TouchableWithoutFeedback onPress={handlePress} accesible={false}>
      <View style={[styles.container, {flex: 1}]}>
        <KeyboardAvoidingView
          style={{ flex: 1, alignItems: 'center', flexGrow: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <ScrollView contentContainerStyle={[{ flexGrow: 1, width: '85%' }, styles.container]} showsVerticalScrollIndicator={false}>
            <Text style={styles.text}>What would you like to train for?</Text>
            <Text style={{ fontSize: 14, color: '#1c5253' }}>(Time or Distance)</Text>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{true: '#01CFEE'}}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isDistance}
              />
            </View>

            <Text style={styles.title}>{isDistance ? 'Distance' : 'Time'}</Text>

            {!isDistance && 
              <>
                <Text style={styles.subtitle}>Minutes</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={value => handleMinsChange(value)}
                  value={minutes}
                  keyboardType="numeric"
                  placeholder="Minutes"
                />
              </>
            }

            <Text style={styles.subtitle}>Miles</Text>
            <TextInput 
              style={styles.input}
              placeholder="Miles"
              keyboardType="numeric"
              value={miles}
              onChangeText={value => handleDistChange(value)}
            />

            {error != '' && 
              <Error message={error}/>
            }
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <StepIndicator currentStep = {1}/>
          <Pressable onPress={handleNext} style={styles.nextButton}>
              <Text style={styles.buttonText}> Next </Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 25,
  },
  switchContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c5253',
  },
  button: {
    backgroundColor: '#1c5253',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
  },
  nextButton: {
    backgroundColor: '#FF5953',
    padding: 10,
    borderRadius: 5,
    margin: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1c5253',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#1c5253',
  },
  input: {
      height: 40,
      marginBottom: 22,
      marginTop: 10,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 50,
      width: 150
    },
});