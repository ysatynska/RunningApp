const ProgressBar = ({ percent }) => {
    const containerStyle = {
      height: 20,
      width: '100%',
      backgroundColor: '#e0e0e0',
      borderRadius: 50,
    };
  
    const fillerStyle = {
      height: '100%',
      width: `${percent}%`,
      backgroundColor: 'red',
      borderRadius: 50,
    };
  
    return (
      <View style={containerStyle}>
        <View style={fillerStyle} />
      </View>
    );
};

export function Profile ({user}) {
    <View style={styles.container}>
        <Text style={styles.welcomeText}> Welcome back, {user.name}! </Text>
        <ProgressBar percent={30}/>

    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    welcomeText: {
      fontSize: 32,
      color: '#01CFEE'
    },
    button: {
      backgroundColor: '#FF5953',
      padding: 10,
      borderRadius: 5,
      margin: 20
    },
    buttonText: {
      color: 'white', 
      fontSize: 20
    },
    image: {
      width: 300,
      height: 300,
      padding: 10,
      margin: 20
    },
    paragraph: {
      textAlign: 'center',
      color: "#A6A6A6",
      padding: 20,
      fontSize: 17
    }
  });