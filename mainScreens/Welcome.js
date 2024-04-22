import { useTheme } from '../helperComponents/ThemeContext.js';
import { getStyles } from '../helperComponents/styles.js';
import React, { useRef, useEffect } from 'react';
import { View, Image, Animated } from 'react-native';
import { Button } from '../helperComponents/Utilities.js';
import { welcomeImage, welcomeText, sharedStyles } from '../helperComponents/styles.js';

export default function Welcome({ navigation }) {
    // Grab dynamic theme
    // const { theme } = useTheme();
    // const styles = getStyles(theme);

    const fadeAnimText = useRef(new Animated.Value(0)).current;
    const fadeAnimButton = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnimText, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(fadeAnimButton, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
    }, [fadeAnimText, fadeAnimButton]);
    return (
        <View style={sharedStyles.justifyContainer}>
            <Image source={require('../images/giphy.gif')} style={[welcomeImage, { transform: [{ scaleX: -1 }] }]} />
            <Animated.Text style={[welcomeText, { opacity: fadeAnimText, marginVertical: 10 }]}>
                {' '}
                Welcome!{' '}
            </Animated.Text>
            <Animated.Text style={[sharedStyles.subscriptText, { opacity: fadeAnimText, marginVertical: 10 }]}>
                Discover the joy of movement with running, a simple step towards a healthy life.
            </Animated.Text>
            <Animated.View style={{ opacity: fadeAnimButton }}>
                <Button
                    onPress={() => navigation.navigate('createAccount')}
                    title="Start"
                    padding={12}
                    alignSelf="center"
                />
            </Animated.View>
        </View>
    );
}
