import React, {useState} from 'react'
import { FlatList, TouchableOpacity, TextInput, Text, View, StyleSheet, Button } from 'react-native';

export default function Availability () {
    // Use state to store 'weekday' objects and their pertinent information
    const [availability, setAvailability] = useState([
        { day: 'Monday', available: false, hours: 0 },
        { day: 'Tuesday', available: false, hours: 0 },
        { day: 'Wednesday', available: false, hours: 0 },
        { day: 'Thursday', available: false, hours: 0 },
        { day: 'Friday', available: false, hours: 0 },
        { day: 'Saturday', available: false, hours: 0 },
        { day: 'Sunday', available: false, hours: 0 },
    ]);

    function handleDaySelection (index) {
        const updatedAvailability = [...availability]; 
        updatedAvailability[index].available = !updatedAvailability[index].available; // Update availability of weekday that was toggled
        setAvailability(updatedAvailability); // Update state to reflect new availability change
    };

    function handleHoursChange (index, hours) {
        const updatedAvailability = [...availability];
        updatedAvailability[index].hours = isNaN(hours) ? 0 : parseInt(hours); // Update 'hours' 
        setAvailability(updatedAvailability);
    };

    // Function to render each item in the availability flatlist
    function renderItem ({ item, index }) {
        return (
            <View style={styles.item}>
                {/* <TouchableOpacity onPress={() => handleDaySelection(index)}>
                    <Text style={{ textDecorationLine: item.available ? 'none' : 'line-through' }}>
                        {item.day}
                    </Text>
                </TouchableOpacity> */}
                <Text style={{ color: item.available ? 'black' : 'red' }}>
                    {item.day}
                </Text>
                <Button
                    item={item}
                    onPress={() => handleDaySelection(index)}
                    title={item.available ? 'Available' : 'Not available'}
                />
                {item.available && (
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={item.hours.toString()}
                        onChangeText={(hours) => handleHoursChange(index, parseInt(hours))}
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>
                Tell us what days you're able to train. 
            </Text>
            <FlatList 
                style={styles.list}
                data={availability}
                renderItem={renderItem}
                keyExtractor={(item) => item.day}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    list: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    instructions: {
        marginBottom: 10,
        fontSize: 18,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#d1dede'
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: 'dimgrey',
    },
    input: {
        width: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingLeft: 5,
    },
});
