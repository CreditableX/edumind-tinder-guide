import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import useChats from '../../hooks/chatProvider';
import useAuth from '../../hooks/useAuth';

const StudentHomeScreen = () => {
  const navigation = useNavigation();
  const { logout, photoUrl } = useAuth();
  const { getChats, chats, updateSingleChatId } = useChats();

  useEffect(() => {
    getChats(); // Fetch chats when the component mounts
  }, []);

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Logout Error', error.message); 
    }
  }

  const moveToSingleChat = (id) => {
    updateSingleChatId(id);
    navigation.navigate("SingleChat");
  }

  // choose up to 2 most recent chats to display
  const selectedChats = chats ? chats.slice(0, 2) : [];

  // chat card
  const ChatItem = ({ chat }) => {
    return (
      <TouchableOpacity onPress={() => moveToSingleChat(chat.chat_id)} style={tw`p-4 border-b border-gray-400`}>
        <Card style={tw`m-2 p-2 rounded-lg shadow-md`}>
          <View style={tw`flex-row items-center`}>
            <Image source={require('../../assets/edumind.png')} style={tw`w-16 h-16 rounded-full m-2`} />
            <View style={tw`flex-1 ml-2`}>
              <Title style={tw`text-lg font-bold`}>{chat.header}</Title>
              <Text style={tw`text-gray-500 text-sm`}>{chat.subject}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={() => navigation.navigate("StudentProfile")}>
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

        <TouchableOpacity onPress={() => navigation.navigate("StudentChat")}>
          <Ionicons name='chatbubbles-sharp' size={30} />
        </TouchableOpacity>
      </View>
      {/* End Header */}

      <Card style={tw`m-4 p-4 rounded-xl`}>
        <Card.Content style={tw`items-center`}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("NewChat")}
            style={tw`my-4 rounded-lg w-36 h-12 justify-center`}
            labelStyle={tw`text-white text-lg`}
          >
            Ask Now
          </Button>
          <Text style={tw`mt-1 text-base`}>Get an answer right away!</Text>
        </Card.Content>
      </Card>

      <Card style={tw`m-4 p-4 rounded-xl`}>
        <Card.Content style={tw`items-center`}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("RateTutor")}
            style={tw`my-4 rounded-lg w-36 h-12 justify-center`}
            labelStyle={tw`text-white text-lg`}
          >
            Rate Tutors
          </Button>
          <Text style={tw`mt-1 text-base`}>Rate your completed chats!</Text>
        </Card.Content>
      </Card>

      <Text style={tw`text-xl font-bold text-center`}>Recent chats</Text>

      <Card style={tw`m-4 p-4 rounded-xl`}>
        <Card.Content>
          {selectedChats.length > 0 ? (
            selectedChats.map(chat => (
              <ChatItem key={chat.chat_id} chat={chat} />
            ))
          ) : (
            <Text style={tw`mt-4 text-lg text-gray-600`}>No chats available</Text>
          )}
        </Card.Content>
      </Card>

      <Button title="Log Out" icon="upload" mode="contained" onPress={() => handleLogOut()}>
        Logout
      </Button>
    </SafeAreaView>
  )
}

export default StudentHomeScreen