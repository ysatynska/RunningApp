import React, {useState} from 'react';
import {View, Switch, StyleSheet, Text, Pressable, TouchableWithoutFeedback, Keyboard} from 'react-native';
import DistancePage from './DistancePage';
import TimePage from './TimePage';
import StepIndicator from "./StepIndicator";

const ChooseOptionPage = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
      <View style={isEnabled ? styles.distanceContainer : styles.timeContainer}>
        <Text style={styles.text}>What would you like to train for?</Text>
        <Text style={{ fontSize: 14, color: '#1c5253' }}>(Time or Distance)</Text>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{false: '#767577', true: '#f4f3f4'}}
            thumbColor={isEnabled ? '#767577' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        
        {isEnabled && <DistancePage/>}
        {!isEnabled && <TimePage/>}

        <View style={styles.footer}>
          <StepIndicator currentStep = {1}/>
          <Pressable onPress={() => navigation.navigate('skillLevel')} style={styles.nextButton}>
              <Text style={styles.buttonText}> Next </Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  distanceContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingBottom: 20,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
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
//    height: 30,
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
});

export default ChooseOptionPage;