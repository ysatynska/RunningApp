import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, StyleSheet } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { StepIndicator } from "../helperComponents/Utilities";
import { Error } from "../helperComponents/Utilities";
import {Button} from "../helperComponents/Utilities.js";
import generateSchedule from "../helperComponents/Schedule";

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
            // saveUserAsync(user); // this function also updates currentBest
            navigation.navigate('profile', {user: user});
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    How many hours are you available for?
                </Text>
                <Text style={[styles.instructions, { fontSize: 12, marginBottom: 10 }]}>
                    (Tap day to select/deselect as available)
                </Text>
                <View style={styles.list}>
                    {availability.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <TouchableOpacity onPress={() => handleDaySelection(index)}>
                                <Text style={[styles.weekday, { textDecorationLine: (item.hours != 0) ? 'none' : 'line-through' }, 
                            { color: (item.hours != 0) ? null : '#01CFEE' }]}>
                                    {item.day}
                                </Text>
                            </TouchableOpacity>
                                <InputSpinner 
                                    max={9}
                                    min={1}
                                    step={1}
                                    value={item.hours}
                                    onChange={(hours) => handleHoursChange(index, hours)}
                                    width={150}
                                    color={(item.hours != 0) ? '#01CFEE' : '#f0f0f0'}
                                    editable={false}
                                    disabled={(item.hours != 0) ? false : true}
                                    inputStyle={[styles.spinnerText, {color: (item.hours != 0) ? null : '#f0f0f0'}]}
                                />
                        </View>
                    ))}
                </View>
                <View style={styles.errorContainer}>
                    {error != '' && 
                        <Error message={error}/>
                    }
                </View>
                <View style={styles.footer}>
                    <StepIndicator currentStep = {3}/>
                    <Button onPress={handleNext} title="Next" padding={10} marginBottom={20} marginTop={20}/>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20,
        justifyContent: 'flex-start',
    },
    instructions: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1c5253',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'dimgrey',
    },
    list: {
        backgroundColor: '#fff'
    },
    weekday: {
        fontSize: 25,
        color: '#1c5253',
    },
    spinnerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1c5253',
    },
    errorContainer: {
        marginVertical: 15
    }
});
