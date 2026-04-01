import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from '../../screen/TodoScreen/TodoScreen';
const Stack = createStackNavigator();
const TodoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TodoScreen"
        component={TodoScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default TodoStack;
