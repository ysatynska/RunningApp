import React, { Component, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Button, Alert, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Progress from 'react-native-progress';
import {Slider} from '@miblanchard/react-native-slider';
import {sampleOutput} from '../Schedule.js';

export function UpdateButton ({ratings}) {
  const average = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/ratings.length;
  
  return (
    <View>
      <Pressable onPress={() => console.log("fires")} style={styles.button}>
        <Text style={styles.buttonText}> Get Next Schedule! </Text>
      </Pressable>
    </View>
  );
} 

export function ProgressBar ({progress, isComplete, ratings}) {
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
            {isComplete && <UpdateButton ratings={ratings}/>}
        </View>
    );
}

export function TrackMark ({index}) {
    return (
        <Text style={{ position: 'absolute', top: -30, left: 5, alignItems: 'center' }}>{index+1}</Text>
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
            onPress={(isChecked) => onSelect(isChecked, item.id)}
            text={item.task}
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

export default function Profile ({user}) {
    const [selectedIds, setSelectedIds] = useState([]);
    const defaultRatings = sampleOutput.map(() => 1);
    const [ratings, setRatings] = useState(defaultRatings);
    const [complete, setComplete] = useState(false);

    const data = sampleOutput.map((day, index) => ({
        id: index,
        title: day.title,
        task: 'run ' + day.distance + ' miles at ' + day.pace + ' miles/hour ' + day.times + ' times'
    }));

    function handleCheckboxChange (isChecked, id) {
        setSelectedIds(prevIds =>
            prevIds.includes(id) ? prevIds.filter(prevId => prevId !== id) : [...prevIds, id]
        );
        
        const length = isChecked ? selectedIds.length + 1 : selectedIds.length - 1;
        if (length/data.length == 1) {
          setComplete(true);
        } else {
          setComplete(false);
        }
    };

    return (
        <View style={styles.container}>
            <ProgressBar progress={selectedIds.length/data.length} isComplete={complete} ratings={ratings}/>
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
                        updateRatings={setRatings}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

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
  list: {
    flex: 1,
    marginTop:20,
  },
  distanceValue: {
    fontSize: 25,
    color: '#FF3B30', 
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
    textAlign: 'center'
  },
  progressContainer: {
    padding: 15,
    backgroundColor: '#FFF', // Replace with the actual background color
    borderRadius: 20,
    shadowColor: '#000', // Replace with the actual shadow color
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  totalDistanceText: {
    fontSize: 15,
    color: '#000', // Replace with the actual text color
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
  slider: {
    marginBottom: 20,
    marginTop: 12,
  },
  maximumTrackStyle: {
    backgroundColor: 'white'
  },
  minimumTrackStyle: {
    backgroundColor: '#01CFEA'
  },
  button: {
      backgroundColor: '#FF7B76',
      padding: 5,
      margin: 5,
      borderRadius: 5,
      textAlign: 'center'
  },
  buttonText: {
      color: 'white', 
      fontSize: 20,
      textAlign: 'center'
  }
});