import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native-web';
import { auth } from '../firebase/config';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

  handleLogout = () => {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Register');
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <View>
        <Text>Bienvenido</Text>

        <TouchableOpacity onPress={() => this.handleLogout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}