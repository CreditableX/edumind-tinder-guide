import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import useAuth from '../../hooks/useAuth';

const TutorHomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout, photoUrl } = useAuth();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Logout Error', error.message); // Display error message if signup fails
    }
  }

  return (
    <SafeAreaView>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={() => navigation.navigate("TutorProfile")}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{ uri: photoUrl ? photoUrl : "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={tw`h-14 w-25`} source={require("../../assets/edumind.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("TutorChat")}>
          <Ionicons name='chatbubbles-sharp' size={30} />
        </TouchableOpacity>
      </View>
      {/* End Header */}

      <Card style={tw`m-4 p-4 rounded-xl`}>
        <Card.Content style={tw`items-center`}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("BrowseQuestions")}
            style={tw`my-4 rounded-lg w-36 h-12 justify-center`}
            labelStyle={tw`text-white text-lg`}
          >
            Browse
          </Button>
          <Text style={tw`mt-1 text-base`}>Browse available questions</Text>
        </Card.Content>
      </Card>

      <Button title="Log Out" icon="upload" mode="contained" onPress={() => handleLogOut()}>
        Logout
      </Button>
    </SafeAreaView>
  )
}

export default TutorHomeScreen