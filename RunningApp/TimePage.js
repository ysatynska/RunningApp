import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const TimePage = () => {
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [selectedOption, setSelectedOption] = useState(null); //the goal distance in miles

    const options = [
        { label: '1/2 mile', value: .5 },
        { label: '1 mile', value: 1 },
        { label: '5 K', value: 3.1 },
        { label: '10 K', value: 6.2 },
    ];

    const handleSelectOption = (value) => {
        setSelectedOption(value);
    }

    return (
        <View styles={styles.container}>
            <Text style={styles.heading}>Time</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setMinutes(text)}
                    value={minutes}
                    keyboardType="numeric"
                    placeholder="Minutes"
                />
                <Text style={styles.label}>Minutes</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setSeconds(text)}
                    value={seconds}
                    keyboardType="numeric"
                    placeholder="Seconds"
                />
                <Text style={styles.label}>Seconds</Text>
            </View>
            <View style={styles.container}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.option}
                        onPress={() => handleSelectOption(option.value)}
                    >
                        <Text>{option.label}</Text>
                        {selectedOption === option.value && <View style={styles.selectedIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>  
        </View>

    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        paddingLeft: 80,
        paddingBottom: 50,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        width: 150,
      },
      label: {
        marginLeft: 10,
        fontSize: 18,
      },
      option: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 5,
        bordercolor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        width: 100,
      },
      selectedIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'blue', // Change color as needed
        marginLeft: 10,
      },
});

export default TimePage;