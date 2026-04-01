import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../StackNavigator/HomeStack';
import TodoStack from '../StackNavigator/TodoStack';
import ProfileStack from '../StackNavigator/ProfileStack';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Todo"
        component={TodoStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
