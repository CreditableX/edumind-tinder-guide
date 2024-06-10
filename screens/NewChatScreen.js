import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Button } from 'react-native';
import tw from 'twrnc';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/core';
import { Picker } from '@react-native-picker/picker';
import useChats from '../hooks/chatProvider';

const NewChatScreen = () => {
    const [subject, setSubject] = useState('');
    const [header, setHeader] = useState('');
    const [question, setQuestion] = useState('');
    const { newChat } = useChats();
    const navigation = useNavigation();

    const handleNewChat = async () => {
        try {
            await newChat(subject, header);
            navigation.navigate('Chat'); // go to chats screen
        } catch (error) {
            Alert.alert('Chat creation error', error.message); // Display error message if chat creation fails
        }
    };

    return (
        <View style={tw`flex-1 justify-center items-center p-4`}>
            <Text style={tw`mb-4 text-lg font-bold`}>Input the following details</Text>

            {/* Dropdown for Subject */}
            <View style={tw`mb-4 border w-4/5`}>
                <Picker
                    selectedValue={subject}
                    onValueChange={(itemValue) => setSubject(itemValue)}
                    style={tw`p-2`}
                >
                    <Picker.Item label="Select a Subject" value="" />
                    <Picker.Item label="Chemistry" value="chemistry" />
                    <Picker.Item label="Physics" value="physics" />
                </Picker>
            </View>

            <TextInput
                placeholder="Header"
                value={header}
                onChangeText={setHeader}
                style={tw`mb-4 border p-2 w-4/5`}
            />
            <TextInput
                placeholder="Question"
                value={question}
                onChangeText={setQuestion}
                style={tw`mb-4 border p-2 w-4/5 h-30`}
                multiline={true} // Enable multiple lines
                textAlignVertical="top" // Align text to start from the top
            />
            <View style={tw`flex-1 ml-2`}>
                <Button title="Submit" onPress={handleNewChat} />
            </View>
        </View>
    );
};

export default NewChatScreen;
