import React, { useState } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { StepIndicator, Error, Button } from '../helperComponents/Utilities';
import RadioGroup from 'react-native-radio-buttons-group';
import { useTheme } from '../helperComponents/ThemeContext.js';
import { getSharedStyles, footerStyle } from '../helperComponents/styles.js';
import { useUser } from '../helperComponents/UserContext';
import { currentBest } from '../helperComponents/Schedule';

export default function SkillLevel({ navigation }) {
    const [selected, setSelected] = useState(null);
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
    const [error, setError] = useState('');
    const { user, updateUser } = useUser();

    // Grab dynamic theme
    const { theme } = useTheme();
    const sharedStyles = getSharedStyles(theme);

    const radioButtons = skillLevels.map((level, index) => ({
        id: index,
        label: skillLevels[index],
        value: skillLevels[index],
    }));

    function handleNext() {
        if (selected != null) {
            updateUser({...user, skillLevel: selected, currentBest: currentBest(user, selected)});
            navigation.navigate('availability');
        } else {
            setError('Please choose one of the options.');
        }
    }

    function handlePress(index) {
        setSelected(index);
        setError('');
    }

    return (
        <TouchableWithoutFeedback onPress={() => setError('')} accesible={false}>
            <View style={[sharedStyles.alignContainer, sharedStyles.justifyContainer]}>
                <Text style={[sharedStyles.headerText, { position: 'absolute', top: 50, fontSize: 25 }]}>
                    {' '}
                    What is your skill level?{' '}
                </Text>
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={(index) => handlePress(index)}
                    selectedId={selected}
                    labelStyle={[sharedStyles.largeText, { marginVertical: 5 }]}
                />
                {error != '' && <Error message={error} />}
                <View style={footerStyle}>
                    <StepIndicator currentStep={2} />
                    <Button onPress={handleNext} title="Next" padding={10} marginBottom={20} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
