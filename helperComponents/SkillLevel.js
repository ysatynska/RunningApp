import React from 'react';
import { Text } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { Error } from '../helperComponents/Utilities';

export default function SkillLevel({ selectedSkillLevel, handleSelectSkill, sharedStyles, error }) {
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
    const radioButtons = skillLevels.map((level, index) => ({
        id: index,
        label: skillLevels[index],
        color: sharedStyles.headerColor,
    }));

    return (
        <>
            <Text style={[sharedStyles.headerText, { fontSize: 25, marginBottom: 25 }]}>
                What is your skill level?{' '}
            </Text>
            <RadioGroup
                key={selectedSkillLevel}
                radioButtons={radioButtons}
                onPress={(index) => handleSelectSkill(index)}
                selectedId={selectedSkillLevel}
                labelStyle={[sharedStyles.largeText, { marginVertical: 5 }]}
            />
            {error != '' && <Error message={error} />}
        </>
    );
}
