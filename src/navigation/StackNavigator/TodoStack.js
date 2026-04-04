import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from '../../screen/TodoScreen/TodoScreen';
import HomeScreenHeader from '../../components/HomeScreenHeader';
import TodoDetails from '../../screen/TodoScreen/TodoDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TodoContextProvider } from '../../context/TodoContext';

const Stack = createStackNavigator();
const TodoStack = () => {
  return (
   <TodoContextProvider>
     <Stack.Navigator>
      <Stack.Screen
        name="TodoScreen"
        component={TodoScreen}
        options={{
          header: props => <HomeScreenHeader {...props} />,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="TodoDetails"
        component={TodoDetails}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Todo Details',

          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}
            />
          ),
        })}
      />
    </Stack.Navigator>
   </TodoContextProvider>
  );
};

export default TodoStack;
