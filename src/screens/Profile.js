import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from 'firebase/app';
import 'firebase/firestore'; 

export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            usuario: [],
            posts: [],
            loading: true,
        };
    }

    componentDidMount() {
        const currentUserEmail = auth.currentUser.email;
        db.collection("users")
            .where("email", "==", currentUserEmail)
            .onSnapshot((docs) => {
                let usuario = [];
                docs.forEach((doc) => {
                    usuario.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                this.setState({
                    usuario: usuario,
                    loading: false,
                });
            });

        db.collection("posts")
            .where("email", "==", currentUserEmail)
            .onSnapshot((docs) => {
                let posts = [];
                docs.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                posts.sort((a, b) => b.data.createdAt - a.data.createdAt)
                this.setState({
                    posts: posts,
                    loading: false,
                });
            });
    }
    handleBorrar = (postId) => {
        db.collection("posts")
            .doc(postId)
            .delete({
                posts: firebase.firestore.FieldValue.arrayRemove(postId)
            })
            .then(()=>{
                this.setState({
                    posts: posts,
                    loading: false,
                })
            })
    };

    handleLogOut() {
        auth.signOut().then(() => {
            this.props.navigation.navigate("Login");
        });
    }

    render() {
        const { usuario, loading, posts } = this.state;
        return (
            <View>
                <Text>Perfil</Text>
                <TouchableOpacity onPress={() => this.handleLogOut()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <FlatList
                    data={usuario}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Email {item.data.email}</Text>
                            <Text>Nombre de usuario: {item.data.username}</Text>
                        </View>
                    )}
                />
                <Text>Posteos:</Text>
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.data.post}</Text>
                            <Text>Likes: {item.data.likes.length}</Text>
                            <TouchableOpacity onPress={() => this.handleBorrar(item.id)}>
                                <Text>Borrar Post</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    }
}
