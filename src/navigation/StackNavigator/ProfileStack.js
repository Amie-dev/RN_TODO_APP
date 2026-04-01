import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screen/Profile/ProfileScreen';
const Stack = createStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{
        headerShown:false
      }} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
