import React, { useState } from 'react';
// prettier-ignore
import { View, Switch, TextInput, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StepIndicator, Error, Button } from '../helperComponents/Utilities';
import { useTheme } from '../helperComponents/ThemeContext.js';
import { getStyles } from '../helperComponents/styles.js';
import { sharedStyles, footerStyle, colors } from '../helperComponents/styles.js';
import { useUser } from '../helperComponents/UserContext';
import generateSchedule, { currentBest } from '../helperComponents/Schedule';

export default function ChooseGoal({ navigation }) {
    const { user, updateUser } = useUser();
    const [isDistance, setIsDistance] = useState(user.goal ? (user.goal.minutes == 0) : false);
    const [minutes, setMinutes] = useState(user.goal ? String(user.goal.minutes) : '');
    const [miles, setMiles] = useState(user.goal ? String(user.goal.miles) : '');
    const [error, setError] = useState('');

    // Grab dynamic theme
    // const { theme } = useTheme();
    // const styles = getStyles(theme);

    function handleDistChange(distance) {
        setError('');
        if (distance < 0) {
            distance = '0';
        } else if ((distance > 15 && !isDistance) || (distance > 30 && isDistance)) {
            // capping distance at 30 if Distance and 15 if Time.
            distance = isDistance ? '30' : '15';
        }
        setMiles(distance);
    }

    function handleMinsChange(minutes) {
        setError('');
        if (minutes < 0) {
            minutes = '0';
        } else if (minutes > 60) {
            // capping minutes at 60.
            minutes = '60';
        }
        setMinutes(minutes);
    }

    function handleNext() {
        if (!isDistance && Number(miles) / Number(minutes) >= 0.5) {
            setError(
                'With the given parameters, you speed would exceed the fastest someone ever ran (' +
                    (Number(miles) / Number(minutes)).toFixed(2) +
                    ' miles/minute vs fastest 0.463 miles/minute).'
            );
        } else if (!isDistance && Number(miles) / Number(minutes) < 0.05) {
            setError(
                'With the given parameters, you speed would be below walking distance (' +
                    (Number(miles) / Number(minutes)).toFixed(3) +
                    ' miles/minute vs walking 0.05 miles/minute).'
            );
        } else if (miles != '0' && miles != '' && (!isDistance ? minutes != '' : true)) {
            const areUpdating = user.goal;
            user.goal = {
                miles: Number(miles),
                minutes: minutes == '' ? 0 : Number(minutes),
            };
            updateUser({...user});
            if (!areUpdating) {
                navigation.navigate('skillLevel');
            } else {
                const newUser = {...user, currentBest: currentBest(user, user.skillLevel)};
                updateUser({...newUser, schedule: generateSchedule(newUser)});
                navigation.navigate('profile');
            }
        } else {
            setError('Please fill out all fields. Miles cannot be 0.');
        }
    }
    function toggleSwitch() {
        setIsDistance((previousState) => !previousState);
        if (isDistance && user.goal){
            // in time now
            if (user.goal.minutes == 0) {
                // training for distance
                setMiles('');
                setMinutes('');
            } else {
                // training for time
                setMiles(String(user.goal.miles));
                setMinutes(String(user.goal.minutes));
            }
        } else if (user.goal) {
            // in distance
            if (user.goal.minutes == 0) {
                // training for distance
                setMiles(String(user.goal.miles));
            } else {
                // training for time
                setMiles('');
                setMinutes('');
            }
        } else {
            setMiles('');
            setMinutes('');
        }
        setError('');
    }

    function handlePress() {
        Keyboard.dismiss();
        setError('');
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress} accesible={false}>
            <View style={[sharedStyles.alignContainer, { flex: 1 }]}>
                <KeyboardAvoidingView
                    style={{ flex: 1, alignItems: 'center', flexGrow: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                >
                    <ScrollView
                        contentContainerStyle={[{ flexGrow: 1 }, sharedStyles.alignContainer]}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={sharedStyles.headerText}>What would you like to train for?</Text>
                        <Text style={[sharedStyles.subscriptText]}>(Time or Distance)</Text>
                        <View style={{ marginVertical: 20 }}>
                            <Switch
                                trackColor={{ true: colors.headerColor }}
                                thumbColor={colors.smallBgColor}
                                ios_backgroundColor={colors.textColor}
                                onValueChange={toggleSwitch}
                                value={isDistance}
                            />
                        </View>

                        <Text style={[sharedStyles.headerText, { fontSize: 26 }]}>
                            {isDistance ? 'Distance' : 'Time'}
                        </Text>

                        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 50 }}>
                            {!isDistance && (
                                <>
                                    <Text style={[sharedStyles.headerText, { textAlign: 'center', fontSize: 15 }]}>
                                        Minutes
                                    </Text>
                                    <TextInput
                                        style={[sharedStyles.input, { marginBottom: 30, width: 150 }]}
                                        onChangeText={(value) => handleMinsChange(value)}
                                        value={minutes}
                                        keyboardType="numeric"
                                        placeholder="Minutes"
                                    />
                                </>
                            )}

                            <Text style={[sharedStyles.headerText, { textAlign: 'center', fontSize: 15 }]}>Miles</Text>
                            <TextInput
                                style={[sharedStyles.input, { marginBottom: 30, width: 150 }]}
                                placeholder="Miles"
                                keyboardType="numeric"
                                value={miles}
                                onChangeText={(value) => handleDistChange(value)}
                            />

                            {error != '' && <Error message={error} />}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                <View style={footerStyle}>
                    <StepIndicator currentStep={1} />
                    <Button onPress={handleNext} title="Next" padding={10} marginBottom={20} marginTop={20} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
