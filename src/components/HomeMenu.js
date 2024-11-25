import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome6'
import Home from '../screens/Home';
import NewPost from "../screens/NewPost"
import Profile from '../screens/Profile';
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => <FontAwesomeIcon name="house" size={24} color="black" />}}/>
      <Tab.Screen name="Nuevo Post" component={NewPost} options={{tabBarIcon: () => <FontAwesomeIcon name="square-plus" size={24} color="black" solid />}}/>
      <Tab.Screen name="Search" component={Search} options={{tabBarIcon: () => <FontAwesomeIcon name="magnifying-glass" size={24} color="black" />}}/>
      <Tab.Screen name="Mi perfil" component={Profile} options={{tabBarIcon: () => <FontAwesomeIcon name="user" size={24} color="black" solid/>}}/>
    </Tab.Navigator>
  );
}