import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const HomeScreenHeader = ({ navigation, route, options }) => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}
    >
      {/* 🔥 Drawer Toggle Button */}
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Text style={{ color: '#fff', fontSize: 18 }}>☰</Text>
      </TouchableOpacity>

      {/* 🔹 Title */}
      <Text
        style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
          marginLeft: 15,
        }}
      >
        {options.title || route.name}
      </Text>
    </View>
  );
};

export default HomeScreenHeader;