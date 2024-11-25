import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native"
import { auth, db } from '../firebase/config'
import firebase from "firebase"

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likedPost: false,
            cantLikes: this.props.item.data.likes.length
        }
    }

    like() {
        db.collection("posts").doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    likedPost: true,
                    cantLikes: this.props.item.data.likes.length
                })
            })
    }

    unLike() {
        db.collection("posts").doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    likedPost: false,
                    cantLikes: this.props.item.data.likes.length
                })
            })
    }

    componentDidMount() {
        if (this.props.item.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                likedPost: true,
                cantLikes: this.props.item.data.likes.length
            })
        }
    }

    render() {
        return (
            <View style={styles.card}>
                <Text style={styles.author}>Post creado por: {this.props.item.data.email}</Text>
                <Text style={styles.postText}>{this.props.item.data.post}</Text>
                <Text style={styles.likes}>Likes: {this.state.cantLikes}</Text>
                {this.state.likedPost ? (
                    <TouchableOpacity style={styles.unlikeButton} onPress={() => this.unLike()}>
                        <Text style={styles.unlikeText}>Unlike</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.likeButton} onPress={() => this.like()}>
                        <Text style={styles.likeText}>Like</Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    author: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    postText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        lineHeight: 22,
    },
    likes: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    likeButton: {
        backgroundColor: '#00BFFF',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    unlikeButton: {
        backgroundColor: '#F44336',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    likeText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    unlikeText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default Post;