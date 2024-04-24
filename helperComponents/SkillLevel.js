import React from 'react';
import { Text } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

export default function SkillLevel({ selectedSkillLevel, handleSelectSkill, sharedStyles }) {
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
    const radioButtons = skillLevels.map((level, index) => ({
        id: index,
        label: skillLevels[index],
        value: skillLevels[index],
    }));

    return (
        <>
            <Text style={[sharedStyles.headerText, { fontSize: 25 }]}>
                {' '}
                What is your skill level?{' '}
            </Text>
            <RadioGroup
                radioButtons={radioButtons}
                onPress={(index) => handleSelectSkill(index)}
                selectedId={selectedSkillLevel}
                labelStyle={[sharedStyles.largeText, { marginVertical: 5 }]}
            />
        </>
    );
}
