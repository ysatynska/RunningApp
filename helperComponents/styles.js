import { StyleSheet } from 'react-native';

// const header_color = '#01CFEE';
// const primary_color = '#F3AF98';
// const secondary_color = '#1C5253';
// const tertiary_color = '#A6A6A6';
// const button_color = '#FF5953';
// const neutral_color = '#FFFFFF';
// const error_color = '#CC0000';

// // Basic shared stylesheet across all screens
// const sharedStyles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: neutral_color,
//         alignItems: 'center',
//         paddingTop: 20,
//         justifyContent: 'flex-start',
//     },
//     instructions: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: primary_color,
//     },
//     nextButton: {
//         backgroundColor: secondary_color,
//         padding: 10,
//         borderRadius: 5,
//         margin: 20
//     },
//     nextButtonText: {
//         color: neutral_color, 
//         fontSize: 20
//     },
// });

// // Stylesheet for availability screen
// const availabilityStyle = StyleSheet.create({
//     button: {
//         backgroundColor: button_color,
//         padding: 10,
//         borderRadius: 5,
//         margin: 20
//     },
//     buttonText: {
//         color: neutral_color, 
//         fontSize: 20
//     },
//     container: {
//         flex: 1,
//         backgroundColor: neutral_color,
//         alignItems: 'center',
//         paddingTop: 20,
//         justifyContent: 'flex-start',
//     },
//     footer: {
//         position: 'absolute',
//         bottom: 0,
//         padding: 10,
//     },
//     instructions: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: secondary_color,
//     },
//     item: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: '100%',
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: 'dimgrey',
//     },
//     list: {
//         backgroundColor: neutral_color
//     },
//     spinnerText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: secondary_color,
//     },
//     weekday: {
//         fontSize: 25,
//         color: secondary_color,
//     },
// });

// // Stylesheet for GoalScreen screen
// const goalScreenStyle = StyleSheet.create({
//     button: {
//         backgroundColor: secondary_color,
//         padding: 10,
//         borderRadius: 5,
//         width: '100%',
//         alignItems: 'center',
//         position: 'absolute',
//         bottom: 0,
//         marginBottom: 20,
//     },
//     buttonText: {
//         color: neutral_color,
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     distanceContainer: {
//         flex: 1,
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         paddingTop: 50,
//         paddingBottom: 20,
//       },
//     footer: {
//         position: 'absolute',
//         bottom: 0,
//         padding: 10,
//     },
//     nextButton: {
//         backgroundColor: button_color,
//         padding: 10,
//         borderRadius: 5,
//         margin: 20
//     },
//     switchContainer: {
//         marginTop: 20,
//         marginBottom: 20,
//     },
//     text: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: secondary_color,
//     },
//     timeContainer: {
//         flex: 1,
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         paddingTop: 50,
//     },
// })

// export default sharedStyles;

// export {
//   header_color,
//   primary_color,
//   secondary_color,
//   tertiary_color,
//   button_color,
//   neutral_color,
//   error_color,

//   availabilityStyle,
//   goalScreenStyle,
//   loginStyle,
//   skillLevelStyle,
//   timePageStyle,
//   welcomePageStyle,
// }


// Liz Adds

export const sharedStyles = StyleSheet.create({
    justifyContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    alignContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1c5253',
    },
    largeText: {
        fontSize: 25,
        color: '#1c5253',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
    },
    subscriptText: {
        fontSize: 16,
        color: '#1c5253',
    },
    image: {
        width: 200,
        height: 200,
        padding: 10,
        margin: 20,
        alignSelf: "center"
    },
    input: {
        height: 40,
        marginTop: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
    },
});

export const welcomeStyles = StyleSheet.create({
    // justifyContainer
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },


    welcomeText: {
      fontSize: 32,
      color: '#01CFEE',
      fontWeight: 'bold',
      textAlign: 'center',
    },

    // image
    image: {
      width: 300,
      height: 300,
      padding: 10,
      margin: 20,
      alignSelf: "center"
    },
    paragraph: {
        // subscriptText
        fontSize: 16,

      textAlign: 'center',
      color: "#A6A6A6",
      marginVertical: 10
    }
});

export const skillStyles = StyleSheet.create({
    title: {
      position: 'absolute',
      top: 50,
      fontWeight: 'bold',

      // largeText
      fontSize: 25,
        color: '#1c5253',
    },

    radioText: {
      marginTop: 10,

      
      // largeText
      fontSize: 25,
        color: '#1c5253',
    },
    // footer
    footer: {
      position: 'absolute',
      bottom: 0,
      padding: 10,
    },

    // justifyContainer + alignContainer
    container: {
        alignItems: 'center',
        paddingTop: 25,
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
  });


// not this view's button is not in a footer.
export const profileStyles = StyleSheet.create({
    // justifyContainer
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },

    taskText: {
        //subscript
        fontSize: 16,
        color: '#1c5253',

        fontWeight: 500
    },


    separator: {
      height: 1,
      width: "100%",
      backgroundColor: "#CED0CE",
    },
    progressBar: {
      marginVertical: 10,
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
      marginBottom: 15
    },

    
    totalDistanceText: {
        // subscriptText
      fontSize: 15,
      color: '#1c5253',



      fontWeight: 'bold',
    },

    
    itemContainer: {
      flexDirection: 'column',
      paddingVertical: 11,
      paddingLeft: 10, 
      paddingRight: 10,
      justifyContent: 'center'
    },

    
    weekday: {
        // largeText

        fontSize: 25,
        color: '#1c5253',
        
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

  // this styles is the exact (!) same as in CreateAccount.js, no need to double check.
export const loginStyles = StyleSheet.create({
    //justifyContainer
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },


    createAccount: {
        // largeText
        fontSize: 25,
        color: '#1c5253',


      marginLeft: 5
    },
  });

  export const createAccountStyles = StyleSheet.create({

    //justifyContainer
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },


    createAccount: {
        // largeText
        fontSize: 25,
        color: '#1c5253',


      marginLeft: 5
    },


    link: {
        //subscriptText

        fontSize: 16,
      color: '#0645AD',
    },

    
    text: {
        // subscriptText
        fontSize: 16,


      color: 'gray',
      marginLeft: 10,
    },
  });

  export const goalStyles = StyleSheet.create({
    //alignContainer
    container: {
        flex: 1,
      alignItems: 'center',
      paddingTop: 25,
    },



    switchContainer: {
      marginTop: 20,
      marginBottom: 20,
    },


    // headerText
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1c5253',
    },


    // footer
    footer: {
      position: 'absolute',
      bottom: 0,
      padding: 10,
    },

    // headerText
    title: {
        fontWeight: 'bold',
        color: '#1c5253',


        fontSize: 25,
    },
    
    subtitle: {
        // headerText
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1c5253',


        fontSize: 15,
        textAlign: 'center'
    },

    
    input: {
        // input
      height: 40,
      marginTop: 10,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 50,


      width: 150,
      marginBottom: 22,
    },
  });

export const availabilityStyles = StyleSheet.create({
    // alignContainer
    container: {
        flex: 1,
    //   backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20,
    },


    //subscriptText
    instructions: {
        fontSize: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        // borderBottomColor: 'dimgrey',
    },
    // list: {
    //     backgroundColor: '#fff'
    // },


    // largeText
    weekday: {
        fontSize: 25,
        color: '#1c5253',
    },


// headerText
    spinnerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1c5253',
    },
});

export const utilitiesStyles = StyleSheet.create({
    button: {
        backgroundColor: '#FF5953',
        borderRadius: 50,
        alignItems: 'center',
    },

    // headerText
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },

    // image
    image: {
        width: 200,
        height: 200,
        padding: 10,
        margin: 20,
        alignSelf: "center"
    },


    // subscriptText
    error: {
        fontSize: 16,
        color: 'red',
        marginLeft: 5,
        marginTop: 5
    },

    stepIndContainer: {
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

export const inputStyles = StyleSheet.create({
    input: {
        height: 40,
        marginTop: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 6,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});