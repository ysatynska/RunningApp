import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { hiddenPasswordIcon, sharedStyles } from '../helperComponents/styles.js';
import { MaterialIcons } from '@expo/vector-icons';
import * as Utilities from '../helperComponents/Utilities.js';

export function Password({ isPasswordVisible, togglePasswordVisibility, password, setPassword }) {
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
            <TouchableOpacity onPressIn={togglePasswordVisibility} style={hiddenPasswordIcon}>
                <MaterialIcons
                    name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                    size={24}
                    color={hiddenPasswordIcon.color}
                />
            </TouchableOpacity>
        </View>
    );
}

export function InputField({ value, onChange, placeholder, autoCap = 'sentences' }) {
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

const Settings = ({ route, navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [theme, setTheme] = useState('light');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    let user = route.params.user;

    const handleGoalUpdate = () => {
        navigation.navigate('chooseGoal', { user: user });
    };

    const handleSaveSettings = async () => {
        user.name = firstName;
        user.password = password;
        navigation.navigate('profile', { user: user });
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Update Settings</Text>

            <Text style={styles.label}>First Name:</Text>
            <InputField value={firstName} onChange={setFirstName} placeholder="First Name" />

            <Text style={styles.label}>New Password:</Text>
            <Password
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
                password={password}
                setPassword={setPassword}
            />

            <Text style={styles.label}>Theme:</Text>
            <View style={styles.themeContainer}>
                <Text style={styles.themeLabel}>Light</Text>
                <Switch value={theme === 'dark'} onValueChange={(value) => setTheme(value ? 'dark' : 'light')} />
                <Text style={styles.themeLabel}>Dark</Text>
            </View>

            <Utilities.Button title="Save Settings" onPress={handleSaveSettings} padding={8} />
            <Utilities.Button title="Edit Goal" onPress={handleGoalUpdate} padding={8} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    themeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    themeLabel: {
        marginHorizontal: 5,
    },
});

export default Settings;
