
export const themes = {
    default: {
        header_color: '#01CFEE',  // Used for header color, placeholder text in InputFields, and input spinner when ACTIVE
        text_color: '#1C5253', // Instructions, text color
        bg_color: '#F0F0F0', // Background screen color
        small_bg_color: '#FFFFFF', // Backrgound object color (input fields and progress container)
        separator_color: '#CED0CE', // Separating lines for Availability and Profile screens
        shadow_color: 'gray', // Shadow used in Profile and for buttons
        button_color: '#FF5953', // Button color
        button_text_color: '#FFFFFF', // Button text color
        input_spinner_color: '#DCDCDC', // Used for incrementing buttons in Availability (when OFF)
        link_color: '#0645AD', // Link color for sign in/create account links
        error_color: '#CC0000', // Error message color
        title: 'default'
    },
    neon: {
        header_color: '#9b5de5',  // Used for header color, placeholder text in InputFields, and input spinner when ACTIVE
        text_color: '#411462', // Instructions, text color
        bg_color: '#41ead4', // Background screen color
        small_bg_color: '#fbff12', // Backrgound object color (input fields and progress container)
        separator_color: '#9b5de5', // Separating lines for Availability and Profile screens
        shadow_color: '9b5de5', // Shadow used in Profile and for buttons
        button_color: '#fbff12', // Button color
        button_text_color: '#411462', // Button text color
        input_spinner_color: '#DCDCDC', // Used for incrementing buttons in Availability
        link_color: '#0645AD', // Link color for sign in/create account links
        error_color: '#CC0000', // Error message color
        title: 'neon'
    },
    roanoke: {
        header_color: '#800000',  // Used for header color, placeholder text in InputFields, and input spinner when ACTIVE
        text_color: '#222222', // Instructions, text color
        bg_color: '#F0F0F0', // Background screen color
        small_bg_color: '#FFFFFF', // Backrgound object color (input fields and progress container)
        separator_color: '#2F0909', // Separating lines for Availability and Profile screens
        shadow_color: '#3F1414', // Shadow used in Profile and for buttons
        button_color: '#800000', // Button color
        button_text_color: '#FFFFFF', // Button text color
        input_spinner_color: '#DCDCDC', // Used for incrementing buttons in Availability (when OFF)
        link_color: '#6BAFC3', // Link color for sign in/create account links
        error_color: '#CF6679', // Error message color
        title: 'roanoke'
    },
    dark: {
        header_color: '#BED754',  // Used for header color, placeholder text in InputFields, and input spinner when ACTIVE
        text_color: '#F0FFF0', // Instructions, text color
        bg_color: '#191919', // Background screen color
        small_bg_color: '#3E403D', // Backrgound object color (input fields and progress container)
        separator_color: '#33F53E', // Separating lines for Availability and Profile screens
        shadow_color: '#546954', // Shadow used in Profile and for buttons
        button_color: '#BED754', // Button color
        button_text_color: '#F0FFF0', // Button text color
        input_spinner_color: 'darkgray', // Used for incrementing buttons in Availability (when OFF)
        link_color: '#E3651D', // Link color for sign in/create account links
        error_color: '#CF6679', // Error message color
        title: 'dark'
    },
};

///////////////////////////////////////////////////////////////////////////////////////////////////

// non-static styles
export function getScreenOptionsStyles (theme) {
    return ({
        headerBackTitleVisible: false,
        headerBackTitleStyle: { color: theme.header_color },
        headerStyle: {
            backgroundColor: theme.header_color
        },
        headerTintColor: theme.small_bg_color,
        statusBarColor: 'auto',
    });
};

export function getSharedStyles (theme) {
    return ({
        headerText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text_color,
        },
        largeText: {
            fontSize: 25,
            color: theme.text_color,
        },
        subscriptText: {
            fontSize: 16,
            color: theme.text_color,
            textAlign: 'center'
        },
        input: {
            height: 40,
            marginTop: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor: theme.small_bg_color,
            borderRadius: 50,
        },
        justifyContainer: {
            flex: 1,
            justifyContent: 'center',
            padding: 20,
            backgroundColor: theme.bg_color,
        },
        alignContainer: {
            alignItems: 'center',
            paddingTop: 20,
            backgroundColor: theme.bg_color,
        },
        linkColor: theme.link_color,
        headerColor: theme.header_color
    });
};

export function getColors (theme) {
    return ({
        headerColor: theme.header_color,
        textColor: theme.text_color,
        inputSpinnerColor: theme.input_spinner_color,
        smallBgColor: theme.small_bg_color,
        bgColor: theme.bg_color,
        errorColor: theme.error_color,
    });
};

export function getProfileStyles (theme) {
    return ({
        separator: {
            height: 1,
            width: "100%",
            backgroundColor: theme.separator_color,
        },
        progressContainer: {
            padding: 15,
            backgroundColor: theme.small_bg_color,
            borderRadius: 20,
            shadowColor: theme.shadow_color,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
            marginBottom: 15
        },
        progressText: {
            fontSize: 16,
            color: theme.text_color,
            textAlign: 'left',
            marginLeft: 5,
            fontWeight: 'bold',
        },
        card: {
            borderRadius: 16,
            paddingLeft: 12,
            paddingRight: 12,
            shadowColor: theme.shadow_color,
            shadowOffset: {
            width: -2,
            height: 1,
            },
            shadowOpacity: 0.7,
            marginTop: 12
        },
        maximumTrackStyle: {
            backgroundColor: theme.small_bg_color,
            color: theme.small_bg_color
        },
        minimumTrackStyle: {
            backgroundColor: theme.header_color,
            color: theme.header_color
        },
        circle: {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: theme.header_color,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10
        },
        circleText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.button_text_color, 
            fontSize: 17
        },
        trackMarkText: { 
            position: 'absolute', 
            top: -30, 
            left: 5, 
            alignItems: 'center', 
            color: theme.text_color 
        }
    });
};

export function getUtilitiesStyles (theme) {
    return ({
        button: {
            backgroundColor: theme.button_color,
            borderRadius: 50,
            alignItems: 'center',
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowColor: theme.shadow_color,
            shadowOffset: { height: 2, width: 0 },
        },
        buttonText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.button_text_color
        },
        circle: {
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: theme.input_spinner_color,
            margin: 5,
        },
        highlightedCircle: {
            backgroundColor: theme.button_color,
        },
    });
};

export function getWelcomeText (theme) {
    return ({
        fontSize: 32,
        color: theme.header_color,
        fontWeight: 'bold',
        textAlign: 'center',
    });
};

export function getHiddenPasswordIcon (theme) {
    return ({
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.text_color
    });
};

export function getAvailabilityItem (theme) {
    return ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.separator_color,
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////

// static styles
export const footerStyle = {
    position: 'absolute',
    bottom: 10,
    padding: 10,
};

export const profileItemContainer = {
    flexDirection: 'column',
    paddingVertical: 11,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
};

export const welcomeImage = {
    width: 315,
    height: 315,
    padding: 10,
    margin: 20,
    alignSelf: 'center',
    borderRadius: 20,
};

export const staticUtilitiesStyles = {
    stepIndContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginImage: {
        width: 250,
        height: 250,
        padding: 10,
        margin: 20,
        alignSelf: 'center',
    },
    error: {
        textAlign: 'left',
        marginLeft: 5,
        marginTop: 5,
        fontSize: 16,
    },
};