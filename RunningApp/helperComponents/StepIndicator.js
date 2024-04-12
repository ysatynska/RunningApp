import React from 'react';
import { View, StyleSheet } from 'react-native';

const StepIndicator = ({ currentStep }) => {
    return (
      <View style={styles.container}>
        {[1, 2, 3].map(step => (
          <View
            key={step}
            style={[
              styles.circle,
              currentStep === step && styles.highlightedCircle,
            ]}
          />
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: '#ccc',
      margin: 5,
    },
    highlightedCircle: {
      backgroundColor: '#FF5953',
    },
  });
  
  export default StepIndicator;