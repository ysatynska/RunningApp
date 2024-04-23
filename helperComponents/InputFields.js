import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { hiddenPasswordIcon, sharedStyles } from '../helperComponents/styles.js';
import { useTheme } from './ThemeContext.js';
import { getStyles } from './styles.js';

export function Password({ isPasswordVisible, togglePasswordVisibility, password, setPassword, marginTop = 12, width = 'auto', height = 40, iconTop = 6 }) {
    // Grab dynamic theme
    // const { theme } = useTheme();
    // const styles = getStyles(theme);

    return (
        <View>
            <TextInput
                style={[sharedStyles.input, {marginTop, width, height}]}
                placeholder="Password"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                color={hiddenPasswordIcon.color}
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
    // const { theme } = useTheme();
    // const styles = getStyles(theme);

    return (
        <TextInput
            style={[sharedStyles.input, {marginBottom, marginTop, height, width, height}]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            autoCapitalize={autoCap}
            color={hiddenPasswordIcon.color}
            editable={editable}
        />
    );
}

export function Username({ username, setUsername }) {
    // Grab dynamic theme
    // const { theme } = useTheme();
    // const styles = getStyles(theme);

    return <InputField value={username} onChange={setUsername} placeholder="Username" autoCap="none" />;
}

export function FirstName({ firstName, setFirstName, marginBottom = 0, placeholder = 'First Name', marginTop = 12, width = 'auto', height = 40 }) {
    // Grab dynamic theme
    // const { theme } = useTheme();
    // const styles = getStyles(theme);

    return <InputField value={firstName} onChange={setFirstName} marginBottom={marginBottom} placeholder={placeholder} marginTop={marginTop} width={width} height={height}/>;
}
