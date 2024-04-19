import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {inputStyles} from "../helperComponents/styles.js";

export function Password ({isPasswordVisible, togglePasswordVisibility, password, setPassword}) {
    return (
      <View style={inputStyles.passwordContainer}>
        <TextInput
            style={inputStyles.input}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
        />
        <TouchableOpacity onPressIn={togglePasswordVisibility} style={inputStyles.icon}>
          <MaterialIcons name={isPasswordVisible ? 'visibility' : 'visibility-off'} size={24} color="grey" />
        </TouchableOpacity>
      </View>
    );
}

export function InputField ({value, onChange, placeholder, autoCap='sentences'}) {
    return (
        <TextInput
            style={inputStyles.input}
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