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

  handleLogout = () => {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Register');
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Bienvenido</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => this.handleLogout()}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  logoutButton: {
    alignSelf: 'center',
    backgroundColor: '#ff5252',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  flatList: {
    paddingBottom: 20,
    alignSelf: 'center'
  },
});