import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function WelcomeBack ({ route }) {
  const { firstName } = route.params; // Extract first name prop from params

  return (
    <View style={styles.container}>
      <Text> Hello, {firstName} </Text>
    </View>
  );
}

function Error ({message}) {
  return (
    <View>
      <Text style={styles.error}>{message}</Text>
    </View>
  );
}

export function LoginScreen ({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');``
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  // Function to check if login is valid
  const handleLogin = async () => {
    try {
      const jsonUser = await AsyncStorage.getItem(username);
      console.log(jsonUser);
      if (jsonUser == null) { // Throw error if username not found
        throw new Error();
      }
      const user = JSON.parse(jsonUser); 
      if (user.password == password) { // If password matches username, login
        navigation.navigate('welcomeBack', { firstName: firstName });
      } else { // Otherwise, password doesn't match
        setInvalidPassword(true);
      }
    } catch (e) {
      setInvalidUsername(true);
    }
  };

  function handlePress () {
    Keyboard.dismiss();
    setInvalidPassword(false);
    setInvalidUsername(false);
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress} accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image source={require('./assets/login.png')} style={styles.image}></Image> */}
        </View>
        <Text style={styles.title}>Login Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        {invalidUsername && <Error message={"Username not found"}/>}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {invalidPassword && <Error message={"Invalid Password"}/>}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("createAccount")}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export function CreateAccount ({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidName, setInvalidName] = useState(false);

  // Function to check if conditions are met for the firstName, username, 
  //   and password entered by the user
  const handleCreate = async () => {
    try {
      if (firstName.length > 30) { // Check if firstName is short enough
        setInvalidName(true);
        throw new Error("invalid name");
      }
      const sameUsername = await AsyncStorage.getItem(username); // See if username is already taken
      if (sameUsername != null) { // If username is taken, throw an error
        setInvalidUsername(true);
        throw new Error("invalid username");
      }
      if (password.length < 8) { // Check password length
        setInvalidPassword(true);
        throw new Error("invalid password");
      }
      // If everything's ok, create new user
      const newUser = JSON.stringify({name: firstName, password: password}); 

      await AsyncStorage.setItem(username, newUser); // Set new user using AsyncStorage
      navigation.navigate('welcomeBack', { firstName: firstName }); // Pass firstName as prop to welcomeBack screen
    } catch (e) {
      console.log(e);
    }
  };

  function handlePress () {
    Keyboard.dismiss();
    setInvalidPassword(false);
    setInvalidUsername(false);
    setInvalidName(false);
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress} accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image source={require('./assets/login.png')} style={styles.image}></Image> */}
        </View>
        <Text style={styles.title}>Account Details</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        {invalidName && <Error message={"First name cannot exceed 30 characters"}/>}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        {invalidUsername && <Error message={"Username already taken"}/>}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {invalidPassword && <Error message={"Password has to contain at least 8 characters"}/>}
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: 300,
    height: 300,
    padding: 10,
    margin: 20
  },
  link: {
    color: '#0645AD',
    textDecorationLine: 'none',
    margin: 12,
    alignSelf: 'center',
    fontSize: 18,
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});
