import { StyleSheet } from 'react-native';

const header_color = '#01CFEE';
const primary_color = '#F3AF98';
const secondary_color = '#1C5253';
const tertiary_color = '#A6A6A6';
const button_color = '#FF5953';
const neutral_color = '#FFFFFF';
const error_color = '#CC0000';

// Basic shared stylesheet across all screens
const sharedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: neutral_color,
        alignItems: 'center',
        paddingTop: 20,
        justifyContent: 'flex-start',
    },
    instructions: {
        fontSize: 20,
        fontWeight: 'bold',
        color: primary_color,
    },
    nextButton: {
        backgroundColor: secondary_color,
        padding: 10,
        borderRadius: 5,
        margin: 20
    },
    nextButtonText: {
        color: neutral_color, 
        fontSize: 20
    },
});

// Stylesheet for availability screen
const availabilityStyle = StyleSheet.create({
    button: {
        backgroundColor: button_color,
        padding: 10,
        borderRadius: 5,
        margin: 20
    },
    buttonText: {
        color: neutral_color, 
        fontSize: 20
    },
    container: {
        flex: 1,
        backgroundColor: neutral_color,
        alignItems: 'center',
        paddingTop: 20,
        justifyContent: 'flex-start',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
    },
    instructions: {
        fontSize: 20,
        fontWeight: 'bold',
        color: secondary_color,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'dimgrey',
    },
    list: {
        backgroundColor: neutral_color
    },
    spinnerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: secondary_color,
    },
    weekday: {
        fontSize: 25,
        color: secondary_color,
    },
});

// Stylesheet for GoalScreen screen
const goalScreenStyle = StyleSheet.create({
    button: {
        backgroundColor: secondary_color,
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
    },
    buttonText: {
        color: neutral_color,
        fontSize: 18,
        fontWeight: 'bold',
    },
    distanceContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
        paddingBottom: 20,
      },
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
    },
    nextButton: {
        backgroundColor: button_color,
        padding: 10,
        borderRadius: 5,
        margin: 20
    },
    switchContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: secondary_color,
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
    },
})

export default sharedStyles;

export {
  header_color,
  primary_color,
  secondary_color,
  tertiary_color,
  button_color,
  neutral_color,
  error_color,

  availabilityStyle,
  goalScreenStyle,
  loginStyle,
  skillLevelStyle,
  timePageStyle,
  welcomePageStyle,
}