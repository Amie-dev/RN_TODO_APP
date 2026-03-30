import { View, Text } from 'react-native';
import React, { use, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator/DrawerNavigator';
import AuthStack from './AuthStack/AuthStack';
import { useUserContext } from '../context/AuthContext';

const RootNavigator = () => {
  const { isAuthenticated} = useUserContext();
  console.log(isAuthenticated)
  return (
    <NavigationContainer>
      {isAuthenticated ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
