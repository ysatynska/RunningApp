import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { StepIndicator } from "../helperComponents/Utilities";
import { Error } from "../helperComponents/Utilities";
import {Button} from "../helperComponents/Utilities.js";
import generateSchedule from "../helperComponents/Schedule";
import {sharedStyles, availabilityItem, colors} from "../helperComponents/styles.js";

export default function Availability({ route, navigation }) {
    const [availability, setAvailability] = useState([
        { day: 'Sunday', hours: 0 },
        { day: 'Monday', hours: 0 },
        { day: 'Tuesday', hours: 0 },
        { day: 'Wednesday', hours: 0 },
        { day: 'Thursday', hours: 0 },
        { day: 'Friday', hours: 0 },
        { day: 'Saturday', hours: 0 },
    ]);
    const [error, setError] = useState('');
    const { user } = route.params;

    // Function to update 'available' state of a weekday
    function handleDaySelection(index) {
        setError('')
        const updatedAvailability = [...availability];
        updatedAvailability[index].hours = (updatedAvailability[index].hours == 0) ? 1 : 0;
        setAvailability(updatedAvailability);
    };

    // Function to update 'hours' state of a weekday when the InputSpinner is incremented
    function handleHoursChange(index, hours) {
        const updatedAvailability = [...availability];
        updatedAvailability[index].hours = isNaN(hours) ? 0 : parseInt(hours);
        setAvailability(updatedAvailability);
    };

    function handleNext () {
        const totalHours = availability.reduce((total, current) => total + current.hours, 0);
        if (totalHours == 0) {
            setError('Please select at least 1 hour when you are available.')
        } else {
            user.schedule = availability.filter(oneDay => oneDay.hours != 0).map((oneDay, index) => {
                return {
                    ...oneDay,
                    id: index,
                    miles: 0,
                    minsPerMile: 0,
                    reps: 0
                }
            });
            user.schedule = generateSchedule(user);
            navigation.navigate('profile', {user: user});
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={sharedStyles.alignContainer}>
                <Text style={sharedStyles.headerText}>
                    How many hours are you available for?
                </Text>
                <Text style={[sharedStyles.subscriptText, {marginBottom: 20}]}>
                    (Tap day to select/deselect as available)
                </Text>
                <View>
                    {availability.map((item, index) => (
                        <View key={index} style={availabilityItem}>
                            <TouchableOpacity onPress={() => handleDaySelection(index)}>
                                <Text style={[sharedStyles.largeText, { textDecorationLine: (item.hours != 0) ? 'none' : 'line-through' }, 
                            { color: (item.hours != 0) ? colors.textColor : colors.headerColor }]}>
                                    {item.day}
                                </Text>
                            </TouchableOpacity>
                                <InputSpinner 
                                    max={9}
                                    min={0}
                                    step={1}
                                    value={item.hours}
                                    onChange={(hours) => handleHoursChange(index, hours)}
                                    width={150}
                                    color={(item.hours != 0) ? colors.headerColor : colors.inputSpinnerColor}
                                    editable={false}
                                    disabled={(item.hours != 0) ? false : true}
                                    inputStyle={sharedStyles.headerText}
                                />
                        </View>
                    ))}
                </View>
                <View>
                    {error != '' && 
                        <Error message={error}/>
                    }
                </View>
                <View>
                    <StepIndicator currentStep = {3}/>
                    <Button onPress={handleNext} title="Get Schedule!" padding={10} marginBottom={20} marginTop={15}/>
                </View>
            </View>
        </ScrollView>
    );
};