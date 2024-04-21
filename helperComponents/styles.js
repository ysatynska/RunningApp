import { StyleSheet } from 'react-native';

export const themes = {
    light: {
        header_color: '#01CFEE',  
        primary_color: '#1C5253', // Instructions, text color
        secondary_color: '#A6A6A6', // Instructions subtext color
        button_color: '#FF5953', // Button color
        neutral_color: '#FFFFFF', // Background color (screen background)
        error_color: '#CC0000', // Error message color
    },
    dark: {
        header_color: '#2F4550',
        primary_color: '#00A6ED',
        secondary_color: '#FAFFFD',
        button_color: '#FE5F55',
        neutral_color: '#0E1111',
        error_color: '#CC0000',
    },
};

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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1c5253',
    },
    largeText: {
        fontSize: 25,
        color: '#1c5253',
    },
    subscriptText: {
        fontSize: 16,
        color: '#1c5253',
        textAlign: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
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

export const hiddenPasswordIcon = {
    position: 'absolute',
    right: 10,
    top: 6,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}

export const welcomeStyles = StyleSheet.create({
    welcomeText: {
        fontSize: 32,
        color: '#01CFEE',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    welcomeImage: {
        width: 315,
        height: 315,
        padding: 10,
        margin: 20,
        alignSelf: "center",
        borderRadius: 20,
    }
});

export const availabilityItem =  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'inherit',
};

export const utilitiesStyles = StyleSheet.create({
    button: {
        backgroundColor: '#FF5953',
        borderRadius: 50,
        alignItems: 'center',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: 'gray',
        shadowOffset: { height: 2, width: 0 },
    },
    buttonText: [
        sharedStyles.headerText, 
        {color: 'white'}
    ],
    loginImage: {
        width: 250,
        height: 250,
        padding: 10,
        margin: 20,
        alignSelf: "center"
    },
    error: {
        color: 'red', 
        textAlign: 'left',
        marginLeft: 5,
        marginTop: 5,
        fontSize: 16,
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
        backgroundColor: '#D3D3D3',
        margin: 5,
        border: '#D3D3D3',
    },
    highlightedCircle: {
        backgroundColor: '#FF5953',
    },
});

export const profileStyles = StyleSheet.create({
    separator: {
      height: 1,
      width: "100%",
      backgroundColor: "#CED0CE",
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
    progressText: [
        sharedStyles.subscriptText,
        {
            textAlign: 'left',
            marginLeft: 5,
            fontWeight: 'bold',
        }
    ],
    itemContainer: {
      flexDirection: 'column',
      paddingVertical: 11,
      paddingLeft: 10, 
      paddingRight: 10,
      justifyContent: 'center'
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