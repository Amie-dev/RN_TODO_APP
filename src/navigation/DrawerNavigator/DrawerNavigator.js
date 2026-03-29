import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from '../TabNavigator/TabNavigator';
import HomeScreenHeader from '../../components/HomeScreenHeader';
import CustomDrawerContent from '../../components/CustomDrawerContent';
import Explore from '../../screen/Explore';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: (props) => <HomeScreenHeader {...props} />,
        headerShown: true, // ensure header is visible
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={TabNavigator}
        options={{
          title: 'Home',
        }}
      />

      <Drawer.Screen
        name="Explore"
        component={Explore}
        options={{
          title: 'Explore',
        }}
      />

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;