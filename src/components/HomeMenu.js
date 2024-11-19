import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import NewPost from "../screens/NewPost"


const Tab = createBottomTabNavigator();

export default function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}> 
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="New Post" component={NewPost} />
    </Tab.Navigator>
  );
}