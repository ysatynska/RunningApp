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
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#ccc',
      margin: 5,
    },
    highlightedCircle: {
      backgroundColor: '#FFBAB8',
    },
  });
  
  export default StepIndicator;