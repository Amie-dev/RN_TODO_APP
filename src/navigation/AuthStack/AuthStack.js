import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../../screen/AuthScreen/AuthScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerShown: false,
          title: 'Auth',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
