import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Switch, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { hiddenPasswordIcon, sharedStyles, footerStyle } from '../helperComponents/styles.js';
import { MaterialIcons } from '@expo/vector-icons';
import * as Utilities from '../helperComponents/Utilities.js';
import * as InputFields from '../helperComponents/InputFields.js';
import { useTheme } from '../helperComponents/ThemeContext.js';
import { getStyles } from '../helperComponents/styles.js';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const DropdownComponent = ({data}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

export default function Settings ({ route, navigation }) {
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [theme, setTheme] = useState('light');
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null)
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

    function handlePress() {
        Keyboard.dismiss();
        setError('');
    }

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
      ];

    return (
        <TouchableWithoutFeedback onPress={handlePress} accesible={false}>
            <View style={[sharedStyles.alignContainer, { flex: 1 }]}>
                <KeyboardAvoidingView
                    style={{ flex: 1, alignItems: 'center', flexGrow: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                >
                    <ScrollView
                        contentContainerStyle={[{ flexGrow: 1 }, sharedStyles.alignContainer]}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={{ alignSelf: 'center', alignItems: 'center'}}>
                            <Text style={[sharedStyles.headerText, { textAlign: 'center', fontSize: 15 }]}>First Name</Text>
                            <InputFields.FirstName value={firstName} onChange={setFirstName} placeholder='First Name' marginBottom={40}/>

                            <Text style={[sharedStyles.headerText, { textAlign: 'center', fontSize: 15 }]}>New Password</Text>
                            <InputFields.Password
                                isPasswordVisible={isPasswordVisible}
                                togglePasswordVisibility={togglePasswordVisibility}
                                password={password}
                                setPassword={setPassword}
                                marginBottom={40}
                            />
                        </View>
                        
                        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 50 }}>
                            <Text style={[sharedStyles.headerText, { textAlign: 'center', fontSize: 15 }]}>Theme:</Text>
                            <DropdownComponent data={data}/>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={footerStyle}>
                    <Utilities.Button title="Save Settings" onPress={handleSaveSettings} padding={8} />
                    <Utilities.Button title="Edit Goal" onPress={handleGoalUpdate} padding={8} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });