import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext.js';
import { getSharedStyles, getHiddenPasswordIcon, getColors } from './styles.js';

export function Password({ isPasswordVisible, togglePasswordVisibility, password, setPassword, marginTop = 12, width = 'auto', height = 40, iconTop = 6 }) {
    // Grab dynamic theme
    const { theme } = useTheme();
    const sharedStyles = getSharedStyles(theme);
    const hiddenPasswordIcon = getHiddenPasswordIcon(theme);
    const colors = getColors(theme);

    return (
        <View>
            <TextInput
                style={[sharedStyles.input, {marginTop, width, height}]}
                placeholder="Password"
                placeholderTextColor={colors.headerColor}
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                color={hiddenPasswordIcon.color}
                placeholderTextColor={hiddenPasswordIcon.color}
            />
            <TouchableOpacity onPressIn={togglePasswordVisibility} style={[hiddenPasswordIcon, {top: iconTop}]}>
                <MaterialIcons
                    name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                    size={24}
                    color={hiddenPasswordIcon.color}
                />
            </TouchableOpacity>
        </View>
    );
}

export function InputField({ value, onChange, placeholder, autoCap = 'sentences', marginBottom = 0, marginTop = 12, height = 40, width = 'auto', editable = true }) {
    // Grab dynamic theme
    const { theme } = useTheme();
    const sharedStyles = getSharedStyles(theme);
    const hiddenPasswordIcon = getHiddenPasswordIcon(theme);
    const colors = getColors(theme);

    return (
        <TextInput
            style={[sharedStyles.input, {marginBottom, marginTop, height, width, height}]}
            placeholder={placeholder}
            placeholderTextColor={colors.headerColor}
            value={value}
            onChangeText={onChange}
            autoCapitalize={autoCap}
            color={hiddenPasswordIcon.color}
            placeholderTextColor={hiddenPasswordIcon.color}
            editable={editable}
        />
    );
}

export function Username({ username, setUsername }) {
    return <InputField value={username} onChange={setUsername} placeholder="Username" autoCap="none" />;
}

export function FirstName({ firstName, setFirstName, marginBottom = 0, placeholder = 'First Name', marginTop = 12, width = 'auto', height = 40 }) {
    return <InputField value={firstName} onChange={setFirstName} marginBottom={marginBottom} placeholder={placeholder} marginTop={marginTop} width={width} height={height}/>;
}
