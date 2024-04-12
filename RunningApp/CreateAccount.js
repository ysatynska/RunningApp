import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as InputFields from './InputFields.js';
import * as Utilities from './Utilities.js';

export default function CreateAccount ({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleCreate = async () => {
    handlePress();
    try {
      if (firstName.length > 30 || firstName.length == 0) {
        setInvalidName(true);
        throw new Error("invalid name");
      }
      const sameUsername = await AsyncStorage.getItem(username);
      if (sameUsername != null || username.length < 3) {
        setInvalidUsername(true);
        throw new Error("invalid username");
      }
      if (password.length < 8) {
        setInvalidPassword(true);
        throw new Error("invalid password");
      }
      const newUser = JSON.stringify({name: firstName, password: password});

      await AsyncStorage.setItem(username, newUser);
      navigation.navigate('goalScreen');
    } catch (e) {
    }
  };

  function handlePress () {
    setInvalidPassword(false);
    setInvalidUsername(false);
    setInvalidName(false);
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Utilities.LoginImage invalidUsername={invalidUsername} invalidPassword={invalidPassword} invalidName={invalidName}/>
            <Text style={styles.createAccount}>Create Account</Text>
            
            <InputFields.FirstName firstName={firstName} setFirstName={setFirstName}/>
            {invalidName && <Utilities.Error message={"Must be between 1 and 30 characters"}/>}
            
            <InputFields.Username username={username} setUsername={setUsername}/>
            {invalidUsername && <Utilities.Error message={username.length < 3 ? "Must be at least 3 characters" : "Username already taken"}/>}
            
            <InputFields.Password isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility} password={password} setPassword={setPassword}/>
            {invalidPassword && <Utilities.Error message={"Must be at least 8 characters"}/>}
            
            <Utilities.Button onPress={handleCreate} title="Sign Up"/>
            
            <View style={{marginTop: 10}}>
                <Text style={styles.text}>
                  Already have an account?{' '}
                  <TouchableOpacity onPress={() => navigation.navigate('login')}>
                      <Text style={styles.link}>Sign in</Text>
                  </TouchableOpacity>
                </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
  },
  createAccount: {
    fontSize: 25,
    marginTop: 20,
    marginLeft: 5
  },
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  button: {
    backgroundColor: '#FF5953',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    padding: 10,
    margin: 20
  },
  link: {
    color: '#0645AD',
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    color: 'gray',
    marginLeft: 5,
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginLeft: 5
  },
  linkContainer: {
    marginTop: 8
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