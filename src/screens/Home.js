import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native-web';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount(){
    db.collection("posts").onSnapshot(
      docs => {
        let posts = []
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        posts.sort((a, b) => b.data.createdAt - a.data.createdAt)
        this.setState({
          posts: posts
        })
      }
    )
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
        <FlatList
        data={this.state.posts}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Post item = {item} />
        )}
         />
      </View>
    );
  }
}