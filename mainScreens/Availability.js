import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { StepIndicator, Error, Button } from '../helperComponents/Utilities';
import generateSchedule from '../helperComponents/Schedule';
import { useTheme } from '../helperComponents/ThemeContext.js';
import { getSharedStyles, getAvailabilityItem, getColors } from '../helperComponents/styles.js';
import { useUser } from '../helperComponents/UserContext';

export default function Availability({ navigation }) {
    const [error, setError] = useState('');
    const { user, updateUser } = useUser();
    const [availability, setAvailability] = useState(
        user.availability ? user.availability :
        [{ day: 'Sunday', hours: 0 },
        { day: 'Monday', hours: 0 },
        { day: 'Tuesday', hours: 0 },
        { day: 'Wednesday', hours: 0 },
        { day: 'Thursday', hours: 0 },
        { day: 'Friday', hours: 0 },
        { day: 'Saturday', hours: 0 }]
    );

    // Grab dynamic theme
    const { theme } = useTheme();
    const sharedStyles = getSharedStyles(theme);
    const colors = getColors(theme);
    const availabilityItem = getAvailabilityItem(theme);

    // Function to update 'available' state of a weekday
    function handleDaySelection(index) {
        setError('');
        const updatedAvailability = [...availability];
        updatedAvailability[index].hours = updatedAvailability[index].hours == 0 ? 1 : 0;
        setAvailability(updatedAvailability);
    }

    // Function to update 'hours' state of a weekday when the InputSpinner is incremented
    function handleHoursChange(index, hours) {
        const updatedAvailability = [...availability];
        updatedAvailability[index].hours = isNaN(hours) ? 0 : parseInt(hours);
        setAvailability(updatedAvailability);
    }

    function handleNextButtonPress() {
        const totalHours = availability.reduce((total, current) => total + current.hours, 0);
        if (totalHours == 0) {
            setError('Please select at least 1 hour when you are available.');
        } else {
            user.schedule = availability
                .filter((oneDay) => oneDay.hours != 0)
                .map((oneDay, index) => {
                    return {
                        ...oneDay,
                        id: index,
                        miles: 0,
                        minsPerMile: 0,
                        reps: 0,
                    };
                });
            updateUser({...user, availability: availability, schedule: generateSchedule(user)});
            navigation.navigate('profile');
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={sharedStyles.alignContainer}>
                    <Text style={sharedStyles.headerText}>How many hours are you available for?</Text>
                    <Text style={[sharedStyles.subscriptText, { marginBottom: 20 }]}>
                        (Tap day to select/deselect as available)
                    </Text>
                    <View>
                        {availability.map((item, index) => (
                            <View key={index} style={availabilityItem}>
                                <TouchableOpacity onPress={() => handleDaySelection(index)}>
                                    <Text
                                        style={[sharedStyles.largeText,
                                            {
                                                textDecorationLine: item.hours != 0 ? 'none' : 'line-through',
                                                color: item.hours != 0 ? colors.textColor : colors.errorColor,
                                            },
                                        ]}
                                    >
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
                                    color={item.hours != 0 ? colors.headerColor : colors.inputSpinnerColor}
                                    editable={false}
                                    disabled={item.hours != 0 ? false : true}
                                    inputStyle={sharedStyles.headerText}
                                />
                            </View>
                        ))}
                    </View>
                    <View>{error != '' && <Error message={error} />}</View>
                    <View>
                        {!user.availability && 
                            <StepIndicator currentStep={3} 
                        />}
                        <Button onPress={handleNextButtonPress} title="Get Schedule!" padding={10} marginBottom={20} marginTop={15} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
