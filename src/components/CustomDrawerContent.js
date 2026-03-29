import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const CustomDrawerContent = props => {
  const { state, navigation } = props;

  const getActiveRouteName = route => {
    if (!route.state) return route.name;
    const nestedRoute = route.state.routes[route.state.index];
    return getActiveRouteName(nestedRoute);
  };

  const activeScreen = getActiveRouteName(state.routes[state.index]);

  console.log('Active:', activeScreen);

  return (
    <View style={styles.container}>
      {/* 👤 Header */}
      <Text style={styles.welcome}>Welcome 👋</Text>
      <View style={styles.userLogo} />
      <Text style={styles.userName}>User Name</Text>

      {/* 🏠 Home Button */}
      <TouchableOpacity
        style={[
          styles.screenTab,
          activeScreen === 'HomeTabs' && styles.activeTab,
        ]}
        onPress={() => navigation.navigate('HomeTabs')}
      >
        <Text style={styles.screenTabText}>Home</Text>
      </TouchableOpacity>

      {/* 🏠 Explor */}
      <TouchableOpacity
        style={[
          styles.screenTab,
          activeScreen === 'Explore' && styles.activeTab,
        ]}
        onPress={() => navigation.navigate('Explore')}
      >
        <Text style={styles.screenTabText}>Explore</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    marginTop: 15,
    backgroundColor: 'black',
  },

  welcome: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },

  userLogo: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    backgroundColor: 'yellow',
    borderRadius: 55, // ✅ FIXED
  },

  userName: {
    color: '#E0E7FF',
    marginTop: 4,
    textAlign: 'center',
  },

  screenTab: {
    backgroundColor: 'blue',
    marginTop: 20,
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: 'green', // ✅ highlight active screen
  },

  screenTabText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
