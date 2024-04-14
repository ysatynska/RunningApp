import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, ScrollView, TouchableWithoutFeedback, Pressable, StyleSheet } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import StepIndicator from "../helperComponents/StepIndicator";
import { Error } from "../helperComponents/Utilities";
import generateSchedule from "../Schedule";

export default function Availability({ route, navigation }) {
    const [availability, setAvailability] = useState([
        { day: 'Sunday', available: false, hours: 0 },
        { day: 'Monday', available: false, hours: 0 },
        { day: 'Tuesday', available: false, hours: 0 },
        { day: 'Wednesday', available: false, hours: 0 },
        { day: 'Thursday', available: false, hours: 0 },
        { day: 'Friday', available: false, hours: 0 },
        { day: 'Saturday', available: false, hours: 0 },
    ]);
    const [error, setError] = useState('');
    const { user } = route.params;

    // Function to update 'available' state of a weekday
    function handleDaySelection(index) {
        setError('')
        const updatedAvailability = [...availability];
        updatedAvailability[index].available = !updatedAvailability[index].available;
        updatedAvailability[index].hours = updatedAvailability[index].available ? 1 : 0;
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
            user.schedule = generateSchedule(user, availability);
            console.log("schedule after: ", JSON.stringify(user, null, 2));
            console.log("schedule after: ", JSON.stringify(user.schedule, null, 2));
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
                                <Text style={[styles.weekday, { textDecorationLine: item.available ? 'none' : 'line-through' }, 
                            { color: item.available ? null : '#01CFEE' }]}>
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
                                color={item.available ? '#01CFEE' : '#f0f0f0'}
                                editable={false}
                                disabled={item.available ? false : true}
                                inputStyle={[styles.spinnerText, {color: item.available ? null : '#f0f0f0'}]}
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
                    <Pressable onPress={handleNext} style={styles.button}>
                        <Text style={styles.buttonText}> Next </Text>
                    </Pressable>
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
    button: {
        backgroundColor: '#FF5953',
        padding: 10,
        borderRadius: 5,
        margin: 20
    },
    buttonText: {
        color: 'white', 
        fontSize: 20
    },
    errorContainer: {
        marginVertical: 15
    }
});
