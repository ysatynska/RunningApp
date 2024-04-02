import React, { Component, useState } from 'react';
import { View, StyleSheet, Dimensions, Button, Alert, Text, FlatList } from 'react-native';
import {sampleOutput} from './Algorithm.js';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Progress from 'react-native-progress';

export default function Profile2 ({user}) {
    const [selectedIds, setSelectedIds] = useState([]);
    const data = sampleOutput.map((day, index) => ({
        id: index,
        title: day.title,
        task: 'run ' + day.distance + ' miles at ' + day.pace + ' miles/hour ' + day.times + ' times'
    }));


    function handleCheckboxChange (itemId, isChecked) {
        setSelectedIds(prevIds => {
        if (isChecked) {
            // Add to selected list
            return [...prevIds, itemId];
        } else {
            // Remove from selected list
            return prevIds.filter(id => id !== itemId);
        }
        });
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.weekday}>{item.title}</Text>
            <BouncyCheckbox
                isChecked={selectedIds.includes(item.id)}
                onPress={(isChecked) => handleCheckboxChange(item.id, isChecked)}
                text={item.task}
                iconStyle={{ borderColor: 'lightgray' }}
                fillColor="#01CFEE"
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <Text style={styles.totalDistanceText}>Progress this week</Text>
                <Progress.Bar
                    style={styles.progressBar}
                    width={Dimensions.get('screen').width - 70}
                    progress={selectedIds.length/data.length}
                    height={20}
                    borderWidth={0}
                    unfilledColor="#ECECEC"
                    color="#01CFEE"
                    borderRadius={10}
                />
            </View>
            <FlatList 
                ItemSeparatorComponent={
                (({highlighted}) => (
                <View
                    style={[styles.separator, highlighted && {marginLeft: 0}]}
                />
                ))}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
    alignItems: 'start',
    padding: 10,
  },
  weekday: {
    fontSize: 18,
    marginBottom: 10
  }
});