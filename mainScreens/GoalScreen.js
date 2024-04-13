import React, {useState} from 'react';
import {View, Switch, StyleSheet, TextInput, Text, Pressable, TouchableWithoutFeedback, Keyboard} from 'react-native';
import StepIndicator from "../helperComponents/StepIndicator";
import { Error } from "../helperComponents/Utilities";

export default function ChooseGoal ({ route, navigation }) {
  const [isDistance, setIsDistance] = useState(false);
  const [minutes, setMinutes] = useState('');
  const [miles, setMiles] = useState('');
  const [areValidParameters, setAreValidParameters] = useState(true);
  const { user } = route.params;

  function handleDistChange (value) {
    setAreValidParameters(true);
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
    setAreValidParameters(true);
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
    if (!isDistance && Number(miles)/Number(minutes) > .5
        || Number(miles)/Number(minutes) < .05) {
        // .5 miles/minute is the fastest a person ever ran.
        // .05 is the walking distance.
        setAreValidParameters(false);
    } else {
      user.goal.miles = miles;
      user.goal.minutes = minutes;
      navigation.navigate('skillLevel', {user: user});
    }
  }
  function toggleSwitch () {
    setIsDistance(previousState => !previousState);
    setMiles('');
    setMinutes('');
  }

  function handlePress () {
    Keyboard.dismiss();
    setAreValidParameters(true);
  }
    
  return (
    <TouchableWithoutFeedback onPress={handlePress} accesible={false}>
      <View style={styles.container}>
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

        {!areValidParameters && 
          <Error message="With the given parameters, you speed would either exceed the fastest someone ever ran or be below walking distance."/>
        }

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
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
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
      width: '50%'
  },
});