import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Pressable, StyleSheet } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import StepIndicator from "../helperComponents/StepIndicator";

export default function Availability({navigation}) {
    const [availability, setAvailability] = useState([
        { day: 'Sunday', available: false, hours: 0 },
        { day: 'Monday', available: false, hours: 0 },
        { day: 'Tuesday', available: false, hours: 0 },
        { day: 'Wednesday', available: false, hours: 0 },
        { day: 'Thursday', available: false, hours: 0 },
        { day: 'Friday', available: false, hours: 0 },
        { day: 'Saturday', available: false, hours: 0 },
    ]);

    // Function to update 'available' state of a weekday
    function handleDaySelection(index) {
        const updatedAvailability = [...availability];
        updatedAvailability[index].available = !updatedAvailability[index].available;
        setAvailability(updatedAvailability);
    };

    // Function to update 'hours' state of a weekday when the InputSpinner is incremented
    function handleHoursChange(index, hours) {
        const updatedAvailability = [...availability];
        updatedAvailability[index].hours = isNaN(hours) ? 0 : parseInt(hours);
        setAvailability(updatedAvailability);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>
                Tell us what days you're able to train.
            </Text>
            <Text style={[styles.instructions, { fontSize: 12, marginBottom: 30 }]}>
                (Tap day to select/deselect as available)
            </Text>
            <View style={styles.list}>
                {availability.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <TouchableOpacity onPress={() => handleDaySelection(index)}>
                            <Text style={[styles.weekday, { textDecorationLine: item.available ? 'none' : 'line-through' }, 
                        { color: item.available ? null : 'red' }]}>
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
                            color={item.available ? '#bdfffd' : '#f0f0f0'}
                            editable={false}
                            disabled={item.available ? false : true}
                            inputStyle={[styles.spinnerText, {color: item.available ? null : '#f0f0f0'}]}
                        />
                    </View>
                ))}
            </View>
            <View style={styles.footer}>
                <StepIndicator currentStep = {3}/>
                <Pressable onPress={() => navigation.navigate('availability')} style={styles.button}>
                    <Text style={styles.buttonText}> Next </Text>
                </Pressable>
            </View>
        </View>
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
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
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
});
