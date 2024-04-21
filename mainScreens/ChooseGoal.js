import React, { useState } from 'react';
import {View, Switch, TextInput, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { StepIndicator, Error, Button } from "../helperComponents/Utilities";
import {sharedStyles} from "../helperComponents/styles.js";
import { useTheme } from '../helperComponents/ThemeContext.js';
import { getStyles } from '../helperComponents/styles.js';

export default function ChooseGoal ({ route, navigation }) {
  const [isDistance, setIsDistance] = useState(false);
  const [minutes, setMinutes] = useState('');
  const [miles, setMiles] = useState('');
  const [error, setError] = useState('');
  const { user } = route.params;

  // Grab dynamic theme
  const { theme } = useTheme();
  const styles = getStyles(theme);

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
      <View style={[sharedStyles.alignContainer, {flex: 1}]}>
        <KeyboardAvoidingView
          style={{ flex: 1, alignItems: 'center', flexGrow: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <ScrollView contentContainerStyle={[{ flexGrow: 1 }, sharedStyles.alignContainer]} showsVerticalScrollIndicator={false}>
            <Text style={sharedStyles.headerText}>What would you like to train for?</Text>
            <Text style={[sharedStyles.subscriptText]}>(Time or Distance)</Text>
            <View style={{marginVertical: 20}}>
              <Switch
                trackColor={{true: '#01CFEE'}}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isDistance}
              />
            </View>

            <Text style={[sharedStyles.headerText, {fontSize: 26}]}>{isDistance ? 'Distance' : 'Time'}</Text>

            <View style={{alignSelf: 'center', alignItems: 'center', marginTop: 50}}>
              {!isDistance && 
                <>
                  <Text style={[sharedStyles.headerText, {textAlign: 'center', fontSize: 15}]}>Minutes</Text>
                  <TextInput
                    style={[sharedStyles.input, {marginBottom: 30, width: 150}]}
                    onChangeText={value => handleMinsChange(value)}
                    value={minutes}
                    keyboardType="numeric"
                    placeholder="Minutes"
                  />
                </>
              }

              <Text style={[sharedStyles.headerText, {textAlign: 'center', fontSize: 15}]}>Miles</Text>
              <TextInput 
                style={[sharedStyles.input, {marginBottom: 30, width: 150}]}
                placeholder="Miles"
                keyboardType="numeric"
                value={miles}
                onChangeText={value => handleDistChange(value)}
              />

              {error != '' && 
                <Error message={error}/>
              }
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={sharedStyles.footer}>
          <StepIndicator currentStep = {1}/>
          <Button onPress={handleNext} title="Next" padding={10} marginBottom={20} marginTop={20}/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}