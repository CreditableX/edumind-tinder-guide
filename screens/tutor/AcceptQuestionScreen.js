import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from 'react';
import useChats from '../../hooks/chatProvider';
import tw from 'twrnc';
import { Card, StyleSheet, Title, Button } from 'react-native-paper'
import useAuth from '../../hooks/useAuth';

const AcceptQuestionScreen = () => {
  const { singleChatId, getMessages, newMessage, messages, tutorAccept, tutorGetChats } = useChats();
  const { userId, userType } = useAuth();
  const navigation = useNavigation();
  
  const handleAcceptChat = async () => {
    try {
      await tutorAccept(singleChatId);
      await tutorGetChats();
      navigation.navigate("BrowseQuestions");
    } catch (error) {
      Alert.alert('Accept chat error', error.message); // Display error message if msg creation fails
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-row items-center justify-between p-4`}>
          <Button
              icon="arrow-left"
              onPress={() => userType == 'student' ? navigation.navigate('StudentHome') : navigation.navigate('TutorHome')}
              style={tw`rounded-l`} // Increase padding and use rounded corners
              contentStyle={tw`py-2 px-6`} // Adjust padding inside the button
          />
          <Text>Tutor name goes here </Text>
          <Text>Tutor picture</Text>
      </View>


      <View style={tw`flex-row items-center p-4`}>
        <Button mode="contained" onPress={handleAcceptChat}>
          Accept chat
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AcceptQuestionScreen