import React, { useState, Component } from 'react';
import { View, StyleSheet, Dimensions, Button, Alert, Text, FlatList } from 'react-native';
import {sampleOutput} from './Algorithm.js';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Progress from 'react-native-progress';
// import Timeline from 'react-native-timeline-flatlist'

// export class Schedule extends Component {
//   constructor(){
//     super()
//     this.data = sampleOutput.map((day, index) => ({
//       id: index,
//       title: day.title,
//       task: 'run ' + day.distance + ' miles at ' + day.pace + ' miles/hour ' + day.times + ' times',
//       icon: require('./assets/running.png')
//     }));
//   } 

//   renderDetail = (rowData, sectionID, rowID) => (
//     <View style={styles.detailContainer}>
//       <View style={styles.textContainer}>
//         <Text style={styles.time}>{rowData.time}</Text>
//         <Text style={styles.title}>{rowData.title}</Text>
//         <Text style={styles.description}>{rowData.description}</Text>
//       </View>
//       <BouncyCheckbox
//         size={25}
//         fillColor="#01CFEE"
//         unfillColor="#FFFFFF"
//         text={this.data[sectionID].task}
//         iconStyle={{borderColor: 'red'}}
//         // textStyle={{textDecorationLine: 'none'}}
//         onPress={this.handlePress}
//       />
//     </View>
//   );

//     handlePress = (isChecked) => {
//       console.log(isChecked)
//     }

//   render() {
//     //'rgb(45,156,219)'
//     return (
//         <Timeline 
//           style={styles.list}
//           data={this.data}
//           separator={true}
//           circleColor='rgb(45,156,219)'
//           lineColor='rgb(45,156,219)'
//           descriptionStyle={{color:'gray'}}
//           showTime={false}
//           innerCircle={'dot'}
//           onEventPress={this.handlePress}
//           renderDetail={this.renderDetail}
//         />
//     );
//   }
// }

export default function Profile ({user}) {
  const data = sampleOutput.map((day, index) => ({
    id: index,
    day: day.title,
    title: 'run ' + day.distance + ' miles at ' + day.pace + ' miles/hour ' + day.times + ' times'
  }));

  const [selectedIds, setSelectedIds] = useState([]);
  const handleCheckboxChange = (itemId, isChecked) => {
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
        <Text>{item.day}</Text>
        <BouncyCheckbox
            isChecked={selectedIds.includes(item.id)}
            onPress={(isChecked) => handleCheckboxChange(item.id, isChecked)}
            text={item.title}
            iconStyle={{ borderColor: 'lightgray' }}
            fillColor="green"
            textStyle={{ textDecorationLine: "none" }}
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
          progress={.2}
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
            ))
        }
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
  },
});