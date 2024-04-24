import React from 'react';
import { Text } from 'react-native';
import { DropdownComponent } from './Utilities';
import { themes } from './styles.js';

export default function ChooseTheme({ sharedStyles, handleToggleTheme, selectedTheme }) {
    const data = Object.keys(themes).map((themeKey) => ({
        _index: themeKey,
        title: themeKey,
        selected: themes[themeKey] === selectedTheme
    }));

    return (
        <>
            <Text style={[sharedStyles.headerText, { fontSize: 25, marginBottom: 25, marginTop: 15 }]}>
                Choose the theme for your app{' '}
            </Text>
            <DropdownComponent data={data} selected={1} value={data.find(item => item.selected)} setValue={handleToggleTheme}/> 
        </>
    );
}