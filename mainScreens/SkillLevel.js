import React, { useState } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { StepIndicator, Error, Button } from "../helperComponents/Utilities";
import RadioGroup from 'react-native-radio-buttons-group';
import {sharedStyles, footerStyle} from "../helperComponents/styles.js";

export default function SkillLevel ({ route, navigation }) {
  const [selected, setSelected] = useState(null);
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const [error, setError] = useState('');
  const { user } = route.params;

  const radioButtons = skillLevels.map((level, index) => (
    {
      id: index,
      label: skillLevels[index],
      value: skillLevels[index]
    }
  ));

  function handleNext () {
    if (selected != null) {

      if (user.goal.minutes == 0) {
        //training for distance
        let milesDist = selected == 0 ? 1 : (selected == 1 ? 3 : 5);
        let milesTempo = selected == 0 ? .5 : (selected == 1 ? 1.5 : 3);
        if (milesTempo > user.goal.miles) {
          milesTempo = user.goal.miles;
        }
        let minutesTempo = selected == 0 ? 6 : (selected == 1 ? 15 : 24);
        user.currentBest = {milesDist: milesDist, milesTempo: milesTempo, minutesTempo: minutesTempo};
      
      } else {
        // training for time
        let milesDist = selected == 0 ? 1 : (selected == 1 ? 3 : 5);

        const paceTempo = selected == 0 ? 14 : (selected == 1 ? 12 : 9);
        const minutesTempo = user.goal.miles * paceTempo;

        user.currentBest = {milesDist: milesDist, minutesTempo: minutesTempo};
      }
      navigation.navigate('availability', {user: user});
    
    } else {
      setError("Please choose one of the options.")
    }
  }

  function handlePress (index) {
    setSelected(index);
    setError('');
  }

  return (
    <TouchableWithoutFeedback onPress={() => setError('')} accesible={false}>
      <View style={[sharedStyles.alignContainer, sharedStyles.justifyContainer]}>
        <Text style={[sharedStyles.headerText, {position: 'absolute', top: 50, fontSize: 25}]}> What is your skill level? </Text>
        <RadioGroup 
            radioButtons={radioButtons} 
            onPress={(index) => handlePress(index)}
            selectedId={selected}
            labelStyle={[sharedStyles.largeText, {marginVertical: 5}]}
        />
        {error != '' && 
          <Error message={error}/>
        }
        <View style={footerStyle}>
          <StepIndicator currentStep={2}/>
          <Button onPress={handleNext} title="Next" padding={10} marginBottom={20}/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}