import React, { Component } from 'react';
import { Text, View } from "react-native"
import { auth, db } from '../firebase/config'
import { TouchableOpacity } from 'react-native';
import firebase from "firebase"

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            likedPost: false,
            cantLikes: this.props.item.data.likes.length
        }
    }

    like(){
        db.collection("posts").doc(this.props.item.id).update({
            likes: firebase.firestone.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                likedPost:true,
                cantLikes: this.props.item.data.likes.length
            })
        })
    }

    unLike(){
        db.collection("posts").doc(this.props.item.id).update({
            likes: firebase.firestone.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                likedPost:false,
                cantLikes: this.props.item.data.likes.length
            })
        })
    }

    componentDidMount(){
        if(this.props.item.data.likes.includes(auth.currentUser.email)){
            this.setState({
                likedPost: true,
                cantLikes: this.props.item.data.likes.length
            })
        }
    }

    render(){
        return(
            <View>
                <Text>Post creado por: {this.props.item.data.email}</Text>
                <Text>{this.props.item.data.post}</Text>
                <Text>likes: {this.state.likes}</Text><br />
                {this.state.likedPost ? (
                    <TouchableOpacity onPress={() => this.unLike()}>
                        <Text>unlike</Text>
                    </TouchableOpacity >
                ) : (
                    <TouchableOpacity onPress={() => this.like()} >
                        <Text>like</Text>
                    </TouchableOpacity >
                )}
            </View>
        )
    }
}

export default Post