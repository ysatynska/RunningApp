import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as InputFields from '../helperComponents/InputFields.js';
import * as Utilities from '../helperComponents/Utilities.js';

export default function LoginScreen ({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const jsonUser = await AsyncStorage.getItem(username);
      if (jsonUser == null) {
        throw new Error("invalid username");
      }
      const user = JSON.parse(jsonUser);
      if (user.password == password) {
        navigation.navigate('profile');
      } else {
        setInvalidPassword(true);
      }
    } catch (e) {
      setInvalidUsername(true);
    }
  };

  function handlePress () {
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Utilities.LoginImage invalidUsername={invalidUsername} invalidPassword={invalidPassword}/>
            <Text style={styles.createAccount}>Login Details</Text>

            <InputFields.Username username={username} setUsername={setUsername}/>
            {invalidUsername && <Utilities.Error message={"Invalid Username"}/>}

            <InputFields.Password isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility} password={password} setPassword={setPassword}/>
            {invalidPassword && <Utilities.Error message={"Invalid Password"}/>}
            
            <Utilities.Button onPress={handleLogin} title="Sign In"/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

// this styles is the exact (!) same as in CreateAccount.js, no need to double check.
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
});
