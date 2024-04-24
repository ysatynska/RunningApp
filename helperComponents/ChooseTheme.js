import React from 'react';
import { Text, View } from 'react-native';
import { DropdownComponent } from './Utilities';
import { themes } from './styles.js';

export default function ChooseTheme({ sharedStyles, handleToggleTheme }) {
    const data = Object.keys(themes).map((themeKey) => ({
        _index: themeKey,
        title: themeKey,
    }));

    return (
        <View style={[sharedStyles.alignContainer, sharedStyles.justifyContainer]}>
            <Text style={[sharedStyles.headerText, { fontSize: 25 }]}>
                {' '}
                Choose the theme for your app{' '}
            </Text>
            <DropdownComponent data={data} selected={1} value={data[0]} setValue={handleToggleTheme}/> 
        </View>
    );
}
