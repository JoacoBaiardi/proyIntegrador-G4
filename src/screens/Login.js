import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { auth } from "../firebase/config";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      logedIn: false,
      error: ""
    }
  }

  onSubmit = () => {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => { this.setState({ logedIn: true }) })
      .then(() => { this.props.navigation.navigate("HomeMenu") })
      .catch(error => { this.setState({ error: "Fallo el login" }) })
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user && !this.state.isRegistering) {
        this.props.navigation.navigate("HomeMenu")
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          keyboardType='email-address'
          placeholder='Email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          style={styles.input}
        />

        <TextInput
          keyboardType='default'
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          style={styles.input}
        />

        <TouchableOpacity onPress={() => this.onSubmit()} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <br />

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.button2}>
          <Text style={styles.buttonText}>Todavia no me registre</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
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
  button2: {
    backgroundColor: '#28a77b',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#28a77b',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  dataContainer: {
    marginTop: 20,
  }
});
