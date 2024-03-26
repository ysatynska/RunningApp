import React, {useState} from 'react';
import {View, Switch, StyleSheet, Text, Pressable, TouchableWithoutFeedback, Keyboard} from 'react-native';
import DistancePage from './DistancePage';
import TimePage from './TimePage';

const ChooseOptionPage = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
      <View style={isEnabled ? styles.distanceContainer : styles.timeContainer}>
        <Text style={styles.text}>Choose What you would like to improve</Text>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        
        {isEnabled && <DistancePage/>}
        {!isEnabled && <TimePage/>}
        <Pressable onPress={() => navigation.navigate('skillLevel')}>
            <Text> Next </Text>
        </Pressable>
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
    backgroundColor: 'white'
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: 'white'
  },
  switchContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
  }
});

export default ChooseOptionPage;