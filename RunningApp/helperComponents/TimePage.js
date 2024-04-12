import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const TimePage = () => {
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [distance, setDistance] = useState(''); //the goal distance in miles



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
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setDistance(text)}
                    value={minutes}
                    keyboardType="numeric"
                    placeholder="Distance (miles)"
                />
                <Text style={styles.label}>Distance</Text>
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
        color: '#1c5253',
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
        marginTop: 5,
        marginLeft: 10,
        fontSize: 22,
        color: '#1c5253',
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