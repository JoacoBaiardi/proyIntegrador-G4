import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      username: "",
      password: "",
      isRegistering: false,
      error: '',
      emailError: '',
      passwordError: ''
    }
  }

  validarDatos = () => {
    const { email, username, password } = this.state
    return email.length > 0 && username.length > 0 && password.length > 0
  }

  onSubmit = () => {
    this.setState({ isRegistering: true, error: '', emailError: '', passwordError: '' })
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(response =>
        db.collection("users").add({
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          createdAt: Date.now()
        })
      )
      .then(() => {
        this.setState({ isRegistering: false })
        auth.signOut()
        this.props.navigation.navigate('Login')
      })
      .catch(error => {
        let emailError = ''
        let passwordError = ''
        if (error.code.includes("email")) {
          emailError = error.message
        } else if (error.code.includes('password')) {
          passwordError = error.message
        }
        this.setState({ error: "Fallo el registro", emailError, passwordError, isRegitering: false })
      })
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user && !this.state.isRegistering) {
        this.props.navigation.navigate("HomeMenu")
      }
    })
  }

  render() {
    const datosValidos = this.validarDatos()

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          keyboardType='email-address'
          placeholder='Email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          style={styles.input}
        />
        {this.state.emailError ? <Text style={styles.errorMessage}>{this.state.emailError}</Text> : null}
        {this.state.email === '' && <Text style={styles.errorText}>Campo obligatorio</Text>}

        <TextInput
          keyboardType='default'
          placeholder='Username'
          onChangeText={text => this.setState({ username: text })}
          value={this.state.username}
          style={styles.input}
        />
        {this.state.username === '' && <Text style={styles.errorText}>Campo obligatorio</Text>}

        <TextInput
          keyboardType='default'
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          style={styles.input}
        />
        {this.state.passwordError ? <Text style={styles.errorMessage}>{this.state.passwordError}</Text> : null}
        {this.state.password === '' && <Text style={styles.errorText}>Campo obligatorio</Text>}

        <TouchableOpacity onPress={() => this.onSubmit()}
          style={[styles.button,
          { backgroundColor: datosValidos ? '#28a745' : '#CCCCCC' }
          ]}
          disabled={!datosValidos}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <br />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.button2}>
          <Text style={styles.buttonText}>Ya tengo cuenta</Text>
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
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});