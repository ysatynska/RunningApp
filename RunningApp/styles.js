import { StyleSheet } from 'react-native';

const header_color = '#01CFEE';
const primary_color = '#F3AF98';
const secondary_color = '#1C5253';
const tertiary_color = '#A6A6A6';
const button_color = '#FF5953';
const neutral_color = '#FFFFFF';
const error_color = '#CC0000';

const styles = StyleSheet.create({
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
        color: '#1c5253',
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
    availabilityList: {
        backgroundColor: neutral_color,
    },
    availabilityListWeekday: {
        fontSize: 25,
        color: '#1c5253',
    },
    spinnerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1c5253',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
    },
    nextButton: {
        backgroundColor: secondary_color,
        padding: 10,
        borderRadius: 5,
        margin: 20
    },
    nextButtonText: {
        color: 'white', 
        fontSize: 20
    },
});

export default sharedStyles;

export {
  header_color,
  primary_color,
  secondary_color,
  tertiary_color,
  button_color,
  neutral_color,
  error_color,
}