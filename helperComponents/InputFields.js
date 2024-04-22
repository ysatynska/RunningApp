import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
    hiddenPasswordIcon,
    sharedStyles,
} from '../helperComponents/styles.js';
import { useTheme } from './ThemeContext.js';
import { getStyles } from './styles.js';

export function Password({
    isPasswordVisible,
    togglePasswordVisibility,
    password,
    setPassword,
}) {
    // Grab dynamic theme
    // const { theme } = useTheme();
    // const styles = getStyles(theme);

    return (
        <View>
            <TextInput
                style={sharedStyles.input}
                placeholder="Password"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                color={hiddenPasswordIcon.color}
            />
            <TouchableOpacity
                onPressIn={togglePasswordVisibility}
                style={hiddenPasswordIcon}
            >
                <MaterialIcons
                    name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                    size={24}
                    color={hiddenPasswordIcon.color}
                />
            </TouchableOpacity>
        </View>
    );
}

export function InputField({
    value,
    onChange,
    placeholder,
    autoCap = 'sentences',
}) {
    // Grab dynamic theme
    // const { theme } = useTheme();
    // const styles = getStyles(theme);

    return (
        <TextInput
            style={sharedStyles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            autoCapitalize={autoCap}
            color={hiddenPasswordIcon.color}
        />
    );
}

export function Username({ username, setUsername }) {
    // Grab dynamic theme
    // const { theme } = useTheme();
    // const styles = getStyles(theme);

    return (
        <InputField
            value={username}
            onChange={setUsername}
            placeholder="Username"
            autoCap="none"
        />
    );
}

export function FirstName({ firstName, setFirstName }) {
    // Grab dynamic theme
    // const { theme } = useTheme();
    // const styles = getStyles(theme);

    return (
        <InputField
            value={firstName}
            onChange={setFirstName}
            placeholder="First Name"
        />
    );
}
