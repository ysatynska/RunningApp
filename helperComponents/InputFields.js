import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {hiddenPasswordIcon, sharedStyles} from "../helperComponents/styles.js";

export function Password ({isPasswordVisible, togglePasswordVisibility, password, setPassword}) {
    return (
      <View>
        <TextInput
            style={sharedStyles.input}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
        />
        <TouchableOpacity onPressIn={togglePasswordVisibility} style={hiddenPasswordIcon}>
          <MaterialIcons name={isPasswordVisible ? 'visibility' : 'visibility-off'} size={24} color="grey"/>
        </TouchableOpacity>
      </View>
    );
}

export function InputField ({value, onChange, placeholder, autoCap='sentences'}) {
    return (
        <TextInput
            style={sharedStyles.input}
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