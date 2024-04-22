import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as InputFields from '../helperComponents/InputFields.js';
import * as Utilities from '../helperComponents/Utilities.js';
import { sharedStyles } from '../helperComponents/styles.js';
import { useTheme } from '../helperComponents/ThemeContext.js';
import { getStyles } from '../helperComponents/styles.js';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Grab dynamic theme
    // const { theme } = useTheme();
    // const styles = getStyles(theme);

    const handleLogin = async () => {
        try {
            const jsonUser = await AsyncStorage.getItem(username);
            if (jsonUser == null) {
                throw new Error('invalid username');
            }
            const user = JSON.parse(jsonUser);
            if (user.password == password) {
                navigation.navigate('profile', { user: user });
            } else {
                setInvalidPassword(true);
            }
        } catch (e) {
            setInvalidUsername(true);
        }
    };

    function handlePress() {
        setInvalidPassword(false);
        setInvalidUsername(false);
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
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
                        />
                        <Text
                            style={[sharedStyles.largeText, { marginLeft: 5 }]}
                        >
                            Login Details
                        </Text>

                        <InputFields.Username
                            username={username}
                            setUsername={setUsername}
                        />
                        {invalidUsername && (
                            <Utilities.Error message={'Invalid Username'} />
                        )}

                        <InputFields.Password
                            isPasswordVisible={isPasswordVisible}
                            togglePasswordVisibility={togglePasswordVisibility}
                            password={password}
                            setPassword={setPassword}
                        />
                        {invalidPassword && (
                            <Utilities.Error message={'Invalid Password'} />
                        )}

                        <Utilities.Button
                            onPress={handleLogin}
                            title="Sign In"
                            padding={8}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
