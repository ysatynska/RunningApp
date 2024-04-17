import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet } from 'react-native';

const Settings = () => {
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState('light');

  const handleSaveSettings = () => {
    // Here you can implement logic to save settings to backend or local storage
    console.log('First Name:', firstName);
    console.log('Password:', password);
    console.log('Theme:', theme);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Settings</Text>

      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />

      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Text style={styles.label}>Theme:</Text>
      <View style={styles.themeContainer}>
        <Text style={styles.themeLabel}>Light</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
        />
        <Text style={styles.themeLabel}>Dark</Text>
      </View>

      <Button title="Save Settings" onPress={handleSaveSettings} />
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