import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsButton = ({ onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.settingsButton}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="cog" size={40} color="#01CFEE" />
        </View>
      </TouchableOpacity>
    );
  };


  const handleSettingsPress = () => {
    navigation.navigate('settings', {user: user});
  };
