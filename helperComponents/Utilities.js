import React from 'react';
import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeContext.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import { getUtilitiesStyles, staticUtilitiesStyles, getProfileStyles, getColors, getSharedStyles } from '../helperComponents/styles.js';

export const SettingsButton = ({ onPress }) => {
    // Grab dynamic theme
    const { theme } = useTheme();
    const profileStyles = getProfileStyles(theme);

    return (
      <TouchableOpacity onPress={onPress} style={profileStyles.settingsButton}>
        <View>
          <Icon name="cog" size={28} color={profileStyles.maximumTrackStyle.color} />
        </View>
      </TouchableOpacity>
    );
};

export function Button({ onPress, title, padding, marginBottom = 0, marginTop = 15, alignSelf = 'auto', width = 'auto' }) {
    // Grab dynamic theme
    const { theme } = useTheme();
    const utilitiesStyles = getUtilitiesStyles(theme);

    return (
        <View>
            <Pressable
                onPress={onPress}
                style={[utilitiesStyles.button, { padding, marginBottom, marginTop, alignSelf, width }]}
            >
                <Text style={utilitiesStyles.buttonText}>{title}</Text>
            </Pressable>
        </View>
    );
}

export function Error({ message, textAlign = 'left' }) {
    // Grab dynamic theme
    const { theme } = useTheme();
    const colors = getColors(theme);

    return (
        <View>
            <Text style={[staticUtilitiesStyles.error, {textAlign: textAlign, color: colors.errorColor}]}>{message}</Text>
        </View>
    );
}

export function LoginImage({ invalidUsername, invalidPassword, invalidName = false }) {
    return (
        <View>
            <Image
                source={
                    invalidUsername || invalidPassword || invalidName
                        ? require('../images/loginFail.png')
                        : require('../images/loginSuccess.png')
                }
                style={staticUtilitiesStyles.loginImage}
            ></Image>
        </View>
    );
}

export function roundToTwoDecimals(num) {
    const rounded = Number(num.toFixed(2));
    // Check if the rounded value is an integer by comparing it to its integer part
    if (rounded === Math.floor(rounded)) {
        return Math.floor(rounded); // or just return rounded
    } else {
        return rounded;
    }
}

export const StepIndicator = ({ currentStep }) => {
    // Grab dynamic theme
    const { theme } = useTheme();
    const utilitiesStyles = getUtilitiesStyles(theme);

    return (
        <View style={staticUtilitiesStyles.stepIndContainer}>
            {[1, 2, 3].map((step) => (
                <View
                    key={step}
                    style={[utilitiesStyles.circle, currentStep === step && utilitiesStyles.highlightedCircle]}
                />
            ))}
        </View>
    );
};

export const DropdownComponent = ({data, value, setValue}) => {
    // Grab dynamic theme
    const { theme } = useTheme();
    const sharedStyles = getSharedStyles(theme);
    const colors = getColors(theme);
    
    return (
      <View>
        <Dropdown
          style={[sharedStyles.input, {height: 35, marginTop: 0, width: 130}]}
          itemTextStyle={[sharedStyles.subscriptText, {textAlign: 'left'}]}
          itemContainerStyle={{borderRadius: 15}}
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
