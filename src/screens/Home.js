import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native-web';
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

  componentDidMount() {
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Bienvenido</Text>
        <FlatList
          style={styles.flatList}
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post item={item} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  flatList: {
    paddingBottom: 20,
    alignSelf: 'center'
  },
});