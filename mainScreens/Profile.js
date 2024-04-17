import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Progress from 'react-native-progress';
import {Slider} from '@miblanchard/react-native-slider';
import generateSchedule, { newCurrentBest } from "../helperComponents/Schedule";
import { saveUserAsync, Button } from "../helperComponents/Utilities";

export function UpdateButton ({ratings, user, updateUser}) {
  function handleUpdate () {
    const average = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/ratings.length;
    // 1 = .5, 10 = 2 rateOfImprovement
    const rateOfImprovement = .5 + ((2 - .5) / (10 - 1)) * (average - 1);

    const newUser = {...user};
    newUser.currentBest = newCurrentBest(newUser.currentBest, rateOfImprovement, user.goal.minutes == 0);
    newUser.schedule = generateSchedule(newUser);
    updateUser(newUser);
  }
  return (
    <View>
      <Button onPress={handleUpdate} title="Get Next Schedule!" padding={5} marginBottom={5} marginTop={5}/>
    </View>
  );
}

export function ProgressBar ({progress, ratings, user, updateUser}) {
  return (
      <View style={styles.progressContainer}>
          <Text style={styles.totalDistanceText}>Progress this week</Text>
          <Progress.Bar
              style={styles.progressBar}
              width={Dimensions.get('screen').width - 70}
              progress={progress}
              height={20}
              borderWidth={0}
              unfilledColor="#ECECEC"
              color="#01CFEE"
              borderRadius={10}
          />
          {progress == 1 && <UpdateButton ratings={ratings} user={user} updateUser={updateUser}/>}
      </View>
  );
}

export function TrackMark ({index}) {
    return (
        <Text style={{ position: 'absolute', top: -30, left: 5, alignItems: 'center', color: '#1c5253' }}>{index+1}</Text>
    );
}

export function RenderItem ({ item, onSelect, isSelected, ratings, updateRatings }) {
  function changeRatings (value) {
    const newRatings = ratings.map((rating, index) => (index === item.id) ? value[0] : rating);
    updateRatings(newRatings);
  }
  return (
    <View style={styles.itemContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.weekday}>{item.title}</Text>
        {isSelected && (
          <View style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: '#01CFEE',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10
          }}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>
              {ratings[item.id]}
            </Text>
          </View>
        )}
      </View>
      <BouncyCheckbox
          isChecked={isSelected}
          onPress={(isChecked) => onSelect(isChecked)}
          text={item.task}
          textStyle={{ color: "#1c5253", fontWeight: '600' }}
          iconStyle={{ borderColor: 'lightgray' }}
          fillColor="#01CFEE"
      />
      
      {!isSelected && 
        <View style={styles.card}>
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
              disabled={isSelected}
              maximumTrackStyle={styles.maximumTrackStyle}
              minimumTrackStyle={styles.minimumTrackStyle}
              thumbTintColor='#01CFEA'
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

  function handleCheckboxChange (isChecked, id) {
    const newSchedule = user.schedule.map((item, index) => (item.id == id ? { ...item, completed: !item.completed } : { ...item }));
    setUser({ ...user, schedule: newSchedule });
  };

  function updateUserRatings (newRatings) {
    const newSchedule = user.schedule.map((item, index) => ({ ...item, rating: newRatings[index] }));
    setUser({ ...user, schedule: newSchedule });
  }

  React.useEffect(() => {
    navigation.setOptions({
      title: `Welcome back, ${user.username}!`,
    });
  }, [user.username, navigation]);


  useEffect(() => {
    saveUserAsync(user); 
  }, [user]);

  return (
      <View style={styles.container}>
          <ProgressBar progress={selectedIds.length/data.length} ratings={ratings} user={user} updateUser={setUser}/>
          <FlatList 
              ItemSeparatorComponent={
                  (({highlighted}) => (
                  <View
                      style={[styles.separator, highlighted && {marginLeft: 0}]}
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

// not this view's button is not in a footer.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
  },
  progressBar: {
    marginBottom: 8,
  },
  progressContainer: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  totalDistanceText: {
    fontSize: 15,
    color: '#1c5253',
    fontWeight: 'bold',
    marginBottom: 10
  },
  itemContainer: {
    flexDirection: 'column',
    paddingTop: 23,
    paddingBottom: 23,
    paddingLeft: 10, 
    paddingRight: 10,
    justifyContent: 'center'
  },
  weekday: {
    fontSize: 18,
    marginBottom: 10,
    color: '#1c5253'
  },
  card: {
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    shadowColor: '#01CFEE',
    shadowOffset: {
      width: -2,
      height: 1,
    },
    shadowOpacity: 0.7,
    marginTop: 12
  },
  maximumTrackStyle: {
    backgroundColor: 'white'
  },
  minimumTrackStyle: {
    backgroundColor: '#01CFEA'
  },
});