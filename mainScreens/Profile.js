import React, { useEffect } from 'react';
import { View, Dimensions, Text, FlatList, TouchableOpacity } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Progress from 'react-native-progress';
import { Slider } from '@miblanchard/react-native-slider';
import generateSchedule, { newCurrentBest } from '../helperComponents/Schedule';
import { Button } from '../helperComponents/Utilities';
import { useTheme } from '../helperComponents/ThemeContext.js';
import { getSharedStyles, getProfileStyles, profileItemContainer } from '../helperComponents/styles.js';
import { SettingsButton } from '../helperComponents/Utilities.js';
import { useUser } from '../helperComponents/UserContext';

export function UpdateButton({ ratings, user, updateUser }) {
    function handleUpdate() {
        const average = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / ratings.length;
        // 1 = .5, 10 = 2 rateOfImprovement
        const rateOfImprovement = 0.5 + ((2 - 0.5) / (10 - 1)) * (average - 1);

        const newUser = { ...user };
        newUser.currentBest = newCurrentBest(newUser.currentBest, rateOfImprovement, user.goal);
        newUser.schedule = generateSchedule(newUser);
        updateUser(newUser);
    }
    return (
        <View>
            <Button onPress={handleUpdate} title="Get Next Schedule!" padding={5} marginBottom={5} marginTop={5} />
        </View>
    );
}

export function ProgressBar({ progress, ratings, user, updateUser }) {
    // Grab dynamic theme
    const { theme } = useTheme();
    const sharedStyles = getSharedStyles(theme);
    const profileStyles = getProfileStyles(theme);

    return (
        <View style={profileStyles.progressContainer}>
            <Text style={profileStyles.progressText}>Progress this week</Text>
            <Progress.Bar
                style={{ marginVertical: 10 }}
                width={Dimensions.get('screen').width - 70}
                progress={progress}
                height={20}
                borderWidth={0}
                unfilledColor={sharedStyles.alignContainer.backgroundColor}
                color={profileStyles.minimumTrackStyle.color}
                borderRadius={10}
            />
            {progress == 1 && <UpdateButton ratings={ratings} user={user} updateUser={updateUser} />}
        </View>
    );
}

export function TrackMark({ index }) {
    // Grab dynamic theme
    const { theme } = useTheme();
    const profileStyles = getProfileStyles(theme);

    return <Text style={profileStyles.trackMarkText}>{index + 1}</Text>;
}

export function RenderItem({ item, onSelect, isSelected, ratings, updateRatings }) {
    // Grab dynamic theme
    const { theme } = useTheme();
    const sharedStyles = getSharedStyles(theme);
    const profileStyles = getProfileStyles(theme);

    function changeRatings(value) {
        const newRatings = ratings.map((rating, index) => (index === item.id ? value[0] : rating));
        updateRatings(newRatings);
    }
    return (
        <View style={profileItemContainer}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text style={sharedStyles.largeText}>{item.title}</Text>
                {isSelected && (
                    // if BouncyCheckbox is checked, circle with feedback is showing.
                    <View style={profileStyles.circle}>
                        <Text style={profileStyles.circleText}>{ratings[item.id]}</Text>
                    </View>
                )}
            </View>
            <BouncyCheckbox
                key={isSelected}
                isChecked={isSelected}
                onPress={() => onSelect(!isSelected)}
                text={item.task}
                textStyle={[sharedStyles.subscriptText, { fontWeight: 500 }]}
                fillColor={profileStyles.circle.backgroundColor}
                style={{ marginTop: 10 }}
            />

            {!isSelected && (
                // if BouncyCheckbox is not checked, slider is showing.
                <View style={profileStyles.card}>
                    <Text tx="Range & Haptic step-mode" />
                    <Slider
                        value={ratings[item.id]}
                        onValueChange={(value) => changeRatings(value)}
                        step={1}
                        minimumValue={1}
                        maximumValue={10}
                        trackMarks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        renderTrackMarkComponent={(index) => <TrackMark index={index} />}
                        trackClickable={true}
                        maximumTrackStyle={profileStyles.maximumTrackStyle}
                        minimumTrackStyle={profileStyles.minimumTrackStyle}
                        thumbTintColor={profileStyles.minimumTrackStyle.color}
                    />
                </View>
            )}
        </View>
    );
}

export default function Profile({ navigation }) {
    // Grab dynamic theme
    const { theme } = useTheme();
    const sharedStyles = getSharedStyles(theme);
    const profileStyles = getProfileStyles(theme);

    const { user, updateUser } = useUser();
    // const [user, setUser] = useState(route.params.user);
    const selectedIds = user.schedule.filter((oneDay) => oneDay.completed).map((oneDay) => oneDay.id);
    const ratings = user.schedule.map((oneDay) => oneDay.rating);
    const data = user.schedule.map((oneDay, index) => ({
        id: index,
        title: oneDay.day,
        task:
            'run ' +
            oneDay.miles +
            (oneDay.minsPerMile == 0
                ? ' miles ' + oneDay.reps + ' non-stop'
                : ' miles at ' + oneDay.minsPerMile + ' mins/mile ' + oneDay.reps + ' times'),
    }));
  
    function handleCheckboxChange(isChecked, id) {
        const newSchedule = user.schedule.map((item) =>
            item.id == id ? { ...item, completed: !item.completed } : { ...item }
        );
        updateUser({ ...user, schedule: newSchedule });
    }

    function updateUserRatings(newRatings) {
        const newSchedule = user.schedule.map((item, index) => ({
            ...item,
            rating: newRatings[index],
        }));
        updateUser({ ...user, schedule: newSchedule });
    }

    React.useEffect(() => {
        navigation.setOptions({
            title: `Welcome back, ${user.name}!`,
        });
    }, [user.name, navigation]);

    useEffect(() => {
        updateUser(user);
    }, [user]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <SettingsButton onPress={() => navigation.navigate('settings')} />
            ),
        });
    }, [navigation, user]);

    return (
        <View style={sharedStyles.justifyContainer}>
            <ProgressBar
                progress={selectedIds.length / data.length}
                ratings={ratings}
                user={user}
                updateUser={updateUser}
            />
            <FlatList
                ItemSeparatorComponent={({ highlighted }) => (
                    <View style={[profileStyles.separator, highlighted && { marginLeft: 0 }]} />
                )}
                data={data}
                renderItem={({ item }) => (
                    <RenderItem
                        item={item}
                        onSelect={(isChecked) => handleCheckboxChange(isChecked, item.id)}
                        isSelected={selectedIds.includes(item.id)}
                        ratings={ratings}
                        updateRatings={(newRatings) => updateUserRatings(newRatings)}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}