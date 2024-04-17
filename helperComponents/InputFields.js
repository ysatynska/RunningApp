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

export function InputField ({value, onChange, placeholder, autoCap='sentences'}) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            autoCapitalize={autoCap}
        />
    );
}

export function Username ({username, setUsername}) {
    return (
        <InputField value={username} onChange={setUsername} placeholder='Username' autoCap='none'/>
    );
}

export function FirstName ({firstName, setFirstName}) {
    return (
        <InputField value={firstName} onChange={setFirstName} placeholder='First Name'/>
    );
}

// these styls are the exact (!) copy of styles in CreateAccount and LoginScreent!

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginTop: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
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
