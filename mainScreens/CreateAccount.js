import React, { useState } from 'react';
// prettier-ignore
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as InputFields from '../helperComponents/InputFields.js';
import * as Utilities from '../helperComponents/Utilities.js';
import { getSharedStyles, getColors } from '../helperComponents/styles.js';
import { useTheme } from '../helperComponents/ThemeContext.js';
import { useUser } from '../helperComponents/UserContext';

export default function CreateAccount({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidName, setInvalidName] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { updateUser } = useUser();

    // Grab dynamic theme
    const { theme } = useTheme();
    const sharedStyles = getSharedStyles(theme);
    const colors = getColors(theme);

    const handleCreate = async () => {
        handlePress();
        try {
            if (firstName.length > 30 || firstName.length == 0) {
                setInvalidName(true);
                throw new Error('invalid name');
            }
            const sameUsername = await AsyncStorage.getItem(username);
            if (sameUsername != null || username.length < 3) {
                setInvalidUsername(true);
                throw new Error('invalid username');
            }
            if (password.length < 8) {
                setInvalidPassword(true);
                throw new Error('invalid password');
            }
            let newUser = {
                name: firstName,
                username: username,
                password: password,
            };
            updateUser(newUser);
            navigation.navigate('chooseGoal');
        } catch (e) {}
    };

    function handlePress() {
        setInvalidPassword(false);
        setInvalidUsername(false);
        setInvalidName(false);
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
            <TouchableWithoutFeedback onPress={handlePress}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={sharedStyles.justifyContainer}>
                            <Utilities.LoginImage
                                invalidUsername={invalidUsername}
                                invalidPassword={invalidPassword}
                                invalidName={invalidName}
                            />
                            <Text style={[sharedStyles.largeText, { marginLeft: 5 }]}>Create Account</Text>

                            <InputFields.FirstName firstName={firstName} setFirstName={setFirstName} />
                            {invalidName && <Utilities.Error message={'Must be between 1 and 30 characters'} />}

                            <InputFields.Username username={username} setUsername={setUsername} />
                            {invalidUsername && (
                                <Utilities.Error
                                    message={
                                        username.length < 3 ? 'Must be at least 3 characters' : 'Username already taken'
                                    }
                                />
                            )}

                            <InputFields.Password
                                isPasswordVisible={isPasswordVisible}
                                togglePasswordVisibility={togglePasswordVisibility}
                                password={password}
                                setPassword={setPassword}
                            />
                            {invalidPassword && <Utilities.Error message={'Must be at least 8 characters'} />}

                            <Utilities.Button onPress={handleCreate} title="Sign Up" padding={8} />

                            <View style={{ marginTop: 10 }}>
                                <Text style={sharedStyles.subscriptText}>
                                    Already have an account?{' '}
                                    <TouchableOpacity onPress={() => navigation.navigate('login')}>
                                        <Text style={[sharedStyles.subscriptText, { color: sharedStyles.linkColor }]}>
                                            Sign in
                                        </Text>
                                    </TouchableOpacity>
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </View>
    );
}
