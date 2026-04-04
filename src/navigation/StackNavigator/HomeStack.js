import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screen/HomeScreen';
import TodoDetails from '../../screen/TodoDetails';
import HomeScreenHeader from '../../components/HomeScreenHeader';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: props => <HomeScreenHeader {...props} />,
          headerShown: true,
        }}
      />
      {/* <Stack.Screen
        name="TodoDetails"
        component={TodoDetails}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
