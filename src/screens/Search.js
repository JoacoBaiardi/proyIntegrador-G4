import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import { db } from "../firebase/config";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: [],
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot((docs) => {
      let user = [];
      docs.forEach((doc) => {
        user.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      this.setState({ users: user });
    });
  }

  UsersFilter() {
    const { users, search } = this.state;
    if (search === "") return users;
    return users.filter((users) =>
      users.data.username.toLowerCase().includes(search.toLowerCase())
    );
  }

  render() {
    const filteredUsers = this.UsersFilter();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Buscador de Usuarios</Text>
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          value={this.state.search}
          onChangeText={(text) => this.setState({ search: text })}
        />
        {filteredUsers.length > 0 ? (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.userContainer}>
                <Text style={styles.username}>{item.data.username}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No se encontró usuario con ese nombre</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignSelf: 'center',
    width: 408
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  userContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  username: {
    fontSize: 16,
  },
});
