import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function Password ({isPasswordVisible, togglePasswordVisibility, password, setPassword}) {
    return (
      <View style={styles.passwordContainer}>
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
        />
        <TouchableOpacity onPressIn={togglePasswordVisibility} style={styles.icon}>
          <MaterialIcons name={isPasswordVisible ? 'visibility' : 'visibility-off'} size={24} color="grey" />
        </TouchableOpacity>
      </View>
    );
}

export function Username ({username, setUsername}) {
    return (
        <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize='none'
        />
    );
}

export function FirstName ({firstName, setFirstName}) {
    return (
        <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
        />
    );
}

// these styls are the exact (!) copy of styles in CreateAccount and LoginScreent!

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
    },
    createAccount: {
        fontSize: 25,
        marginTop: 20,
        marginLeft: 5
    },
    input: {
        height: 40,
        marginTop: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
    },
    button: {
        backgroundColor: '#FF5953',
        padding: 8,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    image: {
        width: 200,
        height: 200,
        padding: 10,
        margin: 20
    },
    link: {
        color: '#0645AD',
        fontSize: 15,
    },
    text: {
        fontSize: 15,
        color: 'gray',
        marginLeft: 5,
    },
    error: {
        fontSize: 16,
        color: 'red',
    },
    linkContainer: {
        marginTop: 8
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 6,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
