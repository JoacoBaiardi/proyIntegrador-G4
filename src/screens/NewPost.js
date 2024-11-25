import React from 'react';
import { View } from 'react-native-web';
import PostForm from "../components/PostForm"


export default function NewPost({ navigation }) {
    return (
        <View>
            <PostForm navigation={navigation} />
        </View>
    );
}