import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity } from 'react-native';
import { hiddenPasswordIcon, sharedStyles } from '../helperComponents/styles.js';
import { MaterialIcons } from '@expo/vector-icons';
import * as Utilities from '../helperComponents/Utilities.js';
import * as InputFields from '../helperComponents/InputFields.js';
import { useTheme } from '../helperComponents/ThemeContext.js';
import { getStyles } from '../helperComponents/styles.js';

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

export default function Settings ({ route, navigation }) {
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [theme, setTheme] = useState('light');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    let user = route.params.user;
    // Grab dynamic theme
    // const { theme } = useTheme();
    // const styles = getStyles(theme);

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
      <View style={[sharedStyles.justifyContainer]}>
        <Text style={sharedStyles.headerText}>Update Settings</Text>

        <Text style={sharedStyles.subscriptText}>First Name:</Text>
        <InputFields.FirstName value={firstName} onChange={setFirstName} placeholder='First Name'/>

        <Text style={sharedStyles.subscriptText}>New Password:</Text>
        <InputFields.Password
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            password={password}
            setPassword={setPassword}
        />
        
        <Text style={sharedStyles.subscriptText}>Theme:</Text>
        <View style={sharedStyles.alignContainer}>
          <Text>Light</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
          />
          <Text>Dark</Text>
        </View>
        <Utilities.Button title="Save Settings" onPress={handleSaveSettings} padding={8} />
        <Utilities.Button title="Edit Goal" onPress={handleGoalUpdate} padding={8} />
      </View>
    );
};