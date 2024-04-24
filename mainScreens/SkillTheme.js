import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { StepIndicator, Error, Button } from '../helperComponents/Utilities';
import { useTheme,  } from '../helperComponents/ThemeContext.js';
import { getSharedStyles, footerStyle } from '../helperComponents/styles.js';
import { useUser } from '../helperComponents/UserContext';
import { currentBest } from '../helperComponents/Schedule';
import SkillLevel from '../helperComponents/SkillLevel.js';
import ChooseTheme from '../helperComponents/ChooseTheme.js';

export default function SkillTheme({ navigation }) {
    const [selectedSkillLevel, setSelectedSkillLevel] = useState(null);
    const [error, setError] = useState('');
    const { user, updateUser } = useUser();

    // Grab dynamic theme
    const { theme, toggleTheme } = useTheme();
    const sharedStyles = getSharedStyles(theme);

    function handleNext() {
        if (selectedSkillLevel != null) {
            updateUser({...user, skillLevel: selectedSkillLevel, theme: theme, currentBest: currentBest(user, selectedSkillLevel)});
            navigation.navigate('availability');
        } else {
            setError('Please choose one of the options.');
        }
    }

    function handleSelectSkill(index) {
        setSelectedSkillLevel(index);
        setError('');
    }

    function handleToggleTheme(theme) {
        toggleTheme(theme.title)
        setError('');
    }

    return (
        <TouchableWithoutFeedback onPress={() => setError('')} accesible={false}>
            <View style={[sharedStyles.alignContainer, sharedStyles.justifyContainer]}>
                <SkillLevel 
                    selectedSkillLevel={selectedSkillLevel}
                    handleSelectSkill={handleSelectSkill}
                    sharedStyles={sharedStyles}
                />
                <ChooseTheme
                    selectedSkillLevel={theme}
                    handleToggleTheme={handleToggleTheme}
                    sharedStyles={sharedStyles}
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
