import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Button, Alert, Text } from 'react-native';
import {sampleOutput} from './Algorithm.js';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Progress from 'react-native-progress';
import Timeline from 'react-native-timeline-flatlist'

export class Schedule extends Component {
  constructor(){
    super()
    this.data = sampleOutput.map((day, index) => ({
      id: index,
      title: day.title,
      description: 'run ' + day.distance + ' miles at ' + day.pace + ' miles/hour ' + day.times + ' times',
      icon: require('./assets/running.png')
    }));
  } 

  renderDetail = (rowData, sectionID, rowID) => (
    <View style={styles.detailContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.time}>{rowData.time}</Text>
        <Text style={styles.title}>{rowData.title}</Text>
        <Text style={styles.description}>{rowData.description}</Text>
      </View>
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text="Done"
        iconStyle={{borderColor: 'red'}}
        textStyle={{textDecorationLine: 'none'}}
        onPress={(isChecked) => {}}
      />
    </View>
  );

    handlePress = (event) => {
      console.log(event)
    }

  render() {
    //'rgb(45,156,219)'
    return (
        <Timeline 
          style={styles.list}
          data={this.data}
          separator={true}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          descriptionStyle={{color:'gray'}}
          showTime={false}
          innerCircle={'dot'}
          onEventPress={this.handlePress}
          renderDetail={renderDetail}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'
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
});

export default function Profile ({user}) {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.totalDistanceText}>Progress this week</Text>
        <Progress.Bar
          style={styles.progressBar}
          width={Dimensions.get('screen').width - 70}
          progress={.2}
          height={20}
          borderWidth={0}
          unfilledColor="#ECECEC"
          color="#FF3B30"
          borderRadius={10}
        />
      </View>
        <Schedule/>
    </View>
  );
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: 'white',
//     },
//     welcomeText: {
//       fontSize: 32,
//       color: '#01CFEE'
//     },
//     button: {
//       backgroundColor: '#FF5953',
//       padding: 10,
//       borderRadius: 5,
//       margin: 20
//     },
//     buttonText: {
//       color: 'white', 
//       fontSize: 20
//     },
//     image: {
//       width: 300,
//       height: 300,
//       padding: 10,
//       margin: 20
//     },
//     paragraph: {
//       textAlign: 'center',
//       color: "#A6A6A6",
//       padding: 20,
//       fontSize: 17
//     }
//   });