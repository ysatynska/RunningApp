import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Progress from 'react-native-progress';
import {Slider} from '@miblanchard/react-native-slider';
import generateSchedule, { newCurrentBest } from "../helperComponents/Schedule";
import { saveUserAsync, Button } from "../helperComponents/Utilities";
import Icon from 'react-native-vector-icons/FontAwesome';
import { sharedStyles, profileStyles, profileItemContainer } from "../helperComponents/styles.js";

export function UpdateButton ({ratings, user, updateUser}) {
  function handleUpdate () {
    const average = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/ratings.length;
    // 1 = .5, 10 = 2 rateOfImprovement
    const rateOfImprovement = .5 + ((2 - .5) / (10 - 1)) * (average - 1);

    const newUser = {...user};
    newUser.currentBest = newCurrentBest(newUser.currentBest, rateOfImprovement, user.goal);
    newUser.schedule = generateSchedule(newUser);
    updateUser(newUser);
  }
  return (
    <View>
      <Button onPress={handleUpdate} title="Get Next Schedule!" padding={5} marginBottom={5} marginTop={5}/>
    </View>
  );
}

const SettingsButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={profileStyles.settingsButton}>
      <View>
        <Icon name="cog" size={40} color="#01CFEE" />
      </View>
    </TouchableOpacity>
  );
};

export function ProgressBar ({progress, ratings, user, updateUser}) {
  return (
      <View style={profileStyles.progressContainer}>
          <Text style={profileStyles.progressText}>Progress this week</Text>
          <Progress.Bar
              style={{marginVertical: 10}}
              width={Dimensions.get('screen').width - 70}
              progress={progress}
              height={20}
              borderWidth={0}
              unfilledColor={sharedStyles.alignContainer.backgroundColor}
              color={profileStyles.minimumTrackStyle.color}
              borderRadius={10}
          />
          {progress == 1 && <UpdateButton ratings={ratings} user={user} updateUser={updateUser}/>}
      </View>
  );
}

export function TrackMark ({index}) {
    return (
        <Text style={profileStyles.trackMarkText}>{index+1}</Text>
    );
}

export function RenderItem ({ item, onSelect, isSelected, ratings, updateRatings }) {
  function changeRatings (value) {
    const newRatings = ratings.map((rating, index) => (index === item.id) ? value[0] : rating);
    updateRatings(newRatings);
  }
  return (
    <View style={profileItemContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={sharedStyles.largeText}>{item.title}</Text>
        {isSelected && (
          <View style={profileStyles.circle}>
            <Text style={profileStyles.circleText}>
              {ratings[item.id]}
            </Text>
          </View>
        )}
      </View>
      <BouncyCheckbox
          key={isSelected}
          isChecked={isSelected}
          onPress={() => onSelect(!isSelected)}
          text={item.task}
          textStyle={[sharedStyles.subscriptText, {fontWeight: 500}]}
          fillColor={profileStyles.circle.backgroundColor}
          style={{marginTop: 10}}
      />
      
      {!isSelected && 
        <View style={profileStyles.card}>
          <Text tx="Range & Haptic step-mode" />
          <Slider
              value={ratings[item.id]}
              onValueChange={(value) => changeRatings(value)}
              step={1}
              minimumValue={1}
              maximumValue={10}
              trackMarks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              renderTrackMarkComponent={(index) => <TrackMark index={index}/>}
              trackClickable={true}
              maximumTrackStyle={profileStyles.maximumTrackStyle}
              minimumTrackStyle={profileStyles.minimumTrackStyle}
              thumbTintColor={profileStyles.minimumTrackStyle.color}
          />
        </View>
      }
    </View>
  );
}

export default function Profile ({ route, navigation }) {
  const [user, setUser] = useState(route.params.user);
  const selectedIds = user.schedule.filter((oneDay) => oneDay.completed).map((oneDay) => oneDay.id);
  const ratings = user.schedule.map((oneDay) => oneDay.rating);
  const data = user.schedule.map((oneDay, index) => ({
      id: index,
      title: oneDay.day,
      task: 'run ' + oneDay.miles + ((oneDay.minsPerMile == 0) ? (' miles ' + oneDay.reps + ' non-stop') : (' miles at ' + oneDay.minsPerMile + ' mins/mile ' + oneDay.reps + ' times'))
  }));
  console.log(JSON.stringify(user, null, 2));
  const handleSettingsPress = () => {
    navigation.navigate('settings', {user: user});
  };

  function handleCheckboxChange (isChecked, id) {
    const newSchedule = user.schedule.map((item) => (item.id == id ? { ...item, completed: !item.completed } : { ...item }));
    setUser({ ...user, schedule: newSchedule });
  };

  function updateUserRatings (newRatings) {
    const newSchedule = user.schedule.map((item, index) => ({ ...item, rating: newRatings[index] }));
    setUser({ ...user, schedule: newSchedule });
  }

  React.useEffect(() => {
    navigation.setOptions({
      title: `Welcome back, ${user.name}!`,
    });
  }, [user.name, navigation]);


  useEffect(() => {
    saveUserAsync(user);
  }, [user]);

  return (
      <View style={sharedStyles.justifyContainer}>
          <SettingsButton onPress={handleSettingsPress}/>
          <ProgressBar progress={selectedIds.length/data.length} ratings={ratings} user={user} updateUser={setUser}/>
          <FlatList 
              ItemSeparatorComponent={
                  (({highlighted}) => (
                  <View
                      style={[profileStyles.separator, highlighted && {marginLeft: 0}]}
                  />
              ))}
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
              keyExtractor={item => item.id.toString()}
          />
      </View>
  );
}