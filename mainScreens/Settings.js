import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Switch, Keyboard, Dimensions, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { getSharedStyles, footerStyle, getAvailabilityItem, getColors } from '../helperComponents/styles.js';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Error} from '../helperComponents/Utilities.js';
import * as InputFields from '../helperComponents/InputFields.js';
import { useTheme } from '../helperComponents/ThemeContext.js';
import { Dropdown } from 'react-native-element-dropdown';
import { useUser } from '../helperComponents/UserContext';
import generateSchedule from '../helperComponents/Schedule';
import { currentBest } from '../helperComponents/Schedule';

const DropdownComponent = ({data, value, setValue}) => {
    // Grab dynamic theme
    const { theme } = useTheme();
    const sharedStyles = getSharedStyles(theme);
    const colors = getColors(theme);
    
    return (
      <View>
        <Dropdown
          style={[sharedStyles.input, {height: 35, marginTop: 0, width: 130}]}
          itemTextStyle={[sharedStyles.subscriptText, {textAlign: 'left'}]}
          selectedTextStyle={[sharedStyles.subscriptText, {textAlign: 'left'}]}
          containerStyle={{borderRadius: 15, backgroundColor: colors.smallBgColor}}
          activeColor={colors.headerColor}
          placeholderStyle={{color: colors.textColor}}
          data={data}
          labelField="title"
          valueField="_index"
          value={value}
          onChange={item => {
            setValue(item);
          }}
        />
      </View>
    );
};

export default function Settings ({ route, navigation }) {
    const { user, updateUser } = useUser();
    const [firstName, setFirstName] = useState(user.name);
    const [password, setPassword] = useState(user.password);
    const screenHeight = Dimensions.get('window').height;

    const themes = [
        { "_index": 0, id: '0', title: 'Dark' },
        { "_index": 1, id: '1', title: 'Light' },
        { "_index": 2, id: '2', title: 'Blue' },
    ];
    const [currTheme, setTheme] = useState(themes[user.theme]);

    const skillLevels = [
        { "_index": 0, title: 'Beginner'}, 
        { "_index": 1, title: 'Intermediate'}, 
        { "_index": 2, title: 'Advanced'}
    ];
    const [skillLevel, setSkillLevel] = useState(skillLevels[user.skillLevel]);

    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [success, setSuccess] = useState(false);

    // Grab dynamic theme
    const { theme } = useTheme();
    const sharedStyles = getSharedStyles(theme);
    const availabilityItem = getAvailabilityItem(theme);
    const colors = getColors(theme);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    function handlePress() {
        Keyboard.dismiss();
        setError('');
        setSuccess(false);
    }

    function changeFirstName () {
        if (firstName.length > 30 || firstName.length == 0) {
            setError('First name must be beteween 1 and 30 characters.');
        } else {
            updateUser({...user, name: firstName});
            setSuccess(true);
        }
    }

    function changePassword () {
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
        } else {
            updateUser({...user, password: password});
            setSuccess(true);
        }
    }

    function changeTheme () {
        // updateUser({...user, theme: theme._index});
        setSuccess(true);
    }

    function changeSkillLevel () {
        const newUser = {...user, skillLevel: skillLevel._index, currentBest: currentBest(user, skillLevel._index)};
        updateUser({...newUser, schedule: generateSchedule(newUser)});
        setSuccess(true);
    }

    useEffect(() => {
        let timer;
        if (success) {
          // Set a timer that lasts for 5 seconds
          timer = setTimeout(() => {
            setSuccess(false);
          }, 3000);
        }
        // Clean up the timer if the component unmounts or if success changes again before the timer fires
        return () => clearTimeout(timer);
      }, [success]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
            <TouchableWithoutFeedback onPress={handlePress} accesible={false}>
                <ScrollView contentContainerStyle={[sharedStyles.alignContainer, { flex: 1 }]}>
                    <View style={[availabilityItem, {height: screenHeight/10}]}>
                        <Text style={[sharedStyles.subscriptText, {width: 80, textAlign: 'left', fontWeight: 'bold'}]}>
                            First Name
                        </Text>
                        <InputFields.FirstName firstName={firstName} setFirstName={setFirstName} marginTop={0} width={130} height={34}/>
                        <Button onPress={changeFirstName} title="Update" padding={8} marginTop={0} buttonText={[sharedStyles.subscriptText, {fontWeight: 'bold'}]}/>
                    </View>

                    <View style={[availabilityItem, {height: screenHeight/10}]}>
                        <Text style={[sharedStyles.subscriptText, {width: 80, textAlign: 'left', fontWeight: 'bold'}]}>
                            Password
                        </Text>
                        <InputFields.Password password={password} setPassword={setPassword} isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility} marginTop={0} width={130} height={35} iconTop={-screenHeight/45}/>
                        <Button onPress={changePassword} title="Update" padding={8} marginTop={0} buttonText={[sharedStyles.subscriptText, {fontWeight: 'bold'}]}/>
                    </View>

                    <View style={[availabilityItem, {height: screenHeight/10}]}>
                        <Text style={[sharedStyles.subscriptText, {width: 80, textAlign: 'left', fontWeight: 'bold'}]}>
                            Theme
                        </Text>
                        <DropdownComponent data={themes} selected={1} value={currTheme} setValue={setTheme}/> 
                        {/* change 1 to the current theme's index selected by the user. */}
                        <Button onPress={changeTheme} title="Update" padding={8} marginTop={0} buttonText={[sharedStyles.subscriptText, {fontWeight: 'bold'}]}/>
                    </View>

                    <View style={[availabilityItem, {height: screenHeight/10}]}>
                        <Text style={[sharedStyles.subscriptText, {width: 80, textAlign: 'left', fontWeight: 'bold'}]}>
                            Skill Level
                        </Text>
                        <DropdownComponent data={skillLevels} selected={user.skillLevel} value={skillLevel} setValue={setSkillLevel}/>
                        <Button onPress={changeSkillLevel} title="Update" padding={8} marginTop={0} buttonText={[sharedStyles.subscriptText, {fontWeight: 'bold'}]}/>
                    </View>

                    <View style={[availabilityItem, {height: screenHeight/10}]}>
                        <Text style={[sharedStyles.subscriptText, {textAlign: 'left', fontWeight: 'bold'}]}>
                            Goal
                        </Text>
                        <Button onPress={() => navigation.push('chooseGoal')} title="Update Goal" padding={8} marginTop={0} buttonText={[sharedStyles.subscriptText, {fontWeight: 'bold'}]}/>
                    </View>

                    <View style={[availabilityItem, {height: screenHeight/10}]}>
                        <Text style={[sharedStyles.subscriptText, {textAlign: 'left', fontWeight: 'bold'}]}>
                            Availability
                        </Text>
                        <Button onPress={() => navigation.push('availability')} title="Update Availability" padding={8} marginTop={0} buttonText={[sharedStyles.subscriptText, {fontWeight: 'bold'}]}/>
                    </View>

                    {success != '' && <Error message="Successfully saved" />}
                    {error != '' && <Error message={error} />}
                    <View style={footerStyle}>
                        <Text style={[sharedStyles.headerText, {textAlign: 'center', color: colors.errorColor, marginBottom: 10}]}>
                            NOTE
                        </Text>
                        <Text style={[sharedStyles.subscriptText, {textAlign: 'center'}]}>
                            Note that if 'Skill Level', 'Goal', or 'Availability' are updated, then the schedule will change.
                        </Text>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    );
};