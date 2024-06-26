import { View, Text, Image } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/core';
import tw from 'twrnc';

const ProfileScreen = () => {
    const { username } = useAuth();
    const navigation = useNavigation();

    console.log(username);

    return (
        <SafeAreaView style={tw`flex-1 p-4`}>
            <View style={tw`flex-row items-center mb-4`}>
                <Image
                    style={tw`h-15 w-15 rounded-full mr-4`}
                    source={{ uri: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" }} // change to user image when complete
                />
                <Text style={tw`text-3xl font-bold`}>{username ? `${username}` : 'Loading user information...'}</Text>
            </View>
            <Text style={tw`text-xl font-bold`}>Name goes here when implemented</Text>
            <Text style={tw`text-xl font-bold`}>Email goes here when implemented</Text>
            <Button
                onPress={() => navigation.navigate("ChangeDetails")}
                mode="contained"
                style={tw`mb-2`}
            >
                Update Details
            </Button>
            <Button
                onPress={() => navigation.navigate('Home')}
                mode="contained"
                style={tw`mb-2`}
            >
                Home
            </Button>
        </SafeAreaView>
    )
}

export default ProfileScreen;
