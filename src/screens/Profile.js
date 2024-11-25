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
            <View style={styles.container}>
    <Text style={styles.header}>Perfil</Text>
    <TouchableOpacity style={styles.logoutboton} onPress={() => this.handleLogOut()}>
        <Text style={styles.logout}>Logout</Text>
    </TouchableOpacity>
    <FlatList
        style={styles.flatList}
        data={usuario}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={styles.infousuarios}>
                <Text style={styles.Info}>Email: {item.data.email}</Text>
                <Text style={styles.Info}>Nombre de usuario: {item.data.username}</Text>
            </View>
        )}
    />
    <Text style={styles.header}>Posteos:</Text>
    <FlatList
        style={styles.flatList}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={styles.post}>
                <Text style={styles.postinfo}>{item.data.post}</Text>
                <Text style={styles.likeinfot}>Likes: {item.data.likes.length}</Text>
                <TouchableOpacity
                    style={styles.Borrar}
                    onPress={() => this.handleBorrar(item.id)}
                >
                    <Text style={styles.BorrarBoton}>Borrar Post</Text>
                </TouchableOpacity>
            </View>
        )}
    />
</View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
        color: "#333",
    },
    logoutboton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 10,
    },
    logout: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    infousuarios: {
        marginBottom: 20,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    Info: {
        fontSize: 16,
        marginBottom: 5,
        color: "#555",
    },
    post: {
        marginBottom: 10,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    postinfo: {
        fontSize: 16,
        marginBottom: 5,
        color: "#333",
    },
    likeinfo: {
        fontSize: 14,
        marginBottom: 5,
        color: "#777",
    },
    Borrar: {
        backgroundColor: "#ff5252",
        padding: 8,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 5,
    },
    BorrarBoton: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    flatList: {
        marginBottom: 20,
    },
});

