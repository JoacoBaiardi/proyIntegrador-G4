import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native-web';

export default function Home(props) {

  return (
    <View>
      <Text>Hola</Text>
      <TouchableOpacity onPress={() => handleLogout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}