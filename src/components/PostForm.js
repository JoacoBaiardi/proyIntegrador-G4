import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config'

export default class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: ""
    }
  }

  onSubmit = () => {
    db.collection("posts").add({
      post: this.state.post,
      email: auth.currentUser.email,
      createdAt: Date.now(),
      likes: []
    })
      .then(() => { this.props.navigation.navigate('Home') })
      .catch(error => { this.setState({ error: "Error en la creacion del post" }) })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>NUEVO POST</Text>
        <TextInput
          keyboardType="default"
          placeholder="Agregar post"
          onChangeText={text => this.setState({ post: text })}
          value={this.state.post}
          style={styles.input}
        />

        <TouchableOpacity onPress={() => this.onSubmit()} style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({

    container: {
      paddingHorizontal: 10,
      marginTop: 20,
    },
    title: {
      fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    },
    input: {
      height: 50,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderStyle: 'solid',
      borderRadius: 6,
      marginVertical: 10,
    },
    button: {
      backgroundColor: '#28a745',
      paddingHorizontal: 10,
      paddingVertical: 6,
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#28a745',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    dataContainer: {
      marginTop: 20,
    }
  });
