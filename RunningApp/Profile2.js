import React, { Component, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Button, Alert, Text, FlatList, TouchableOpacity } from 'react-native';
import {sampleOutput} from './Algorithm.js';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Progress from 'react-native-progress';
import {
    HapticModeEnum,
    Slider,
  } from 'react-native-awesome-slider';

export function ProgressBar ({progress}) {
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
        </View>
    );
}

export function RenderItem ({ item, onSelect, isSelected }) {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.weekday}>{item.title}</Text>
            <BouncyCheckbox
                isChecked={isSelected}
                onPress={() => onSelect(item.id)}
                text={item.task}
                iconStyle={{ borderColor: 'lightgray' }}
                fillColor="#01CFEE"
            />
            {/* <View style={[styles.card]}>
                <Text tx="Range & Haptic step-mode" />
                <Slider
                    progress={.3}
                    minimumValue={0}
                    style={styles.slider}
                    maximumValue={10}
                    step={1}
                    // onHapticFeedback={() => {
                    //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    // }}
                    sliderHeight={8}
                    thumbWidth={24}
                    // hapticMode={HapticModeEnum.STEP}
                />
            </View> */}
        </View>
    );
}


export default function Profile2 ({user}) {
    const [selectedIds, setSelectedIds] = useState([]);
    const data = sampleOutput.map((day, index) => ({
        id: index,
        title: day.title,
        task: 'run ' + day.distance + ' miles at ' + day.pace + ' miles/hour ' + day.times + ' times'
    }));

    function handleCheckboxChange (isChecked, item) {
        setSelectedIds(prevIds =>
            prevIds.includes(id) ? prevIds.filter(prevId => prevId !== id) : [...prevIds, id]
        );
    };

    return (
        <View style={styles.container}>
            <ProgressBar progress={selectedIds.length/data.length}/>
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
                        onSelect={handleCheckboxChange}
                        isSelected={selectedIds.includes(item.id)}
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
    color: '#FF3B30', // Replace with the actual text color
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
    // alignItems: 'start',
    padding: 10,
    justifyContent: 'center',
    height: 100
  },
  weekday: {
    fontSize: 18,
    marginBottom: 10
  },
  card: {
    borderRadius: 16,
    padding: 12,
    marginTop: 20,
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    elevation: 1,
    marginBottom: 12,
  },
  slider: {
    marginBottom: 20,
    marginTop: 12,
  },
});