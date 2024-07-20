import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ImageBackground } from 'react-native';
import { Checkbox } from 'react-native-paper';
import useAuth from '../hooks/useAuth';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/core';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isTutor, setIsTutor] = useState(false);
  const { studentLogin, tutorLogin } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (isTutor) {
        await tutorLogin(username, password);
        navigation.navigate('TutorHome');
      } else {
        await studentLogin(username, password); // Student login
        navigation.navigate('StudentHome');
      }
    } catch (error) {
      console.error('Login error:', error); // Handle login error
    }

    // if (isTutor) {
    //   navigation.navigate('TutorHome'); // Navigate to home page if successful
    // } else {
    //   navigation.navigate('StudentHome'); // Navigate to home page if successful
    // }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-black`}>
      <View style={tw`bg-white p-4 rounded-lg shadow-lg w-4/5 max-w-md`}>
        <Text style={tw`text-center mb-4 text-lg font-bold`}>
          You are not logged in! Login to see this page.
        </Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={tw`mb-4 border p-2 w-full`}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={tw`mb-4 border p-2 w-full`}
          onSubmitEditing={handleLogin} // Handle pressing the "Enter" key
        />

        <View style={tw`flex-row items-center mb-4`}>
          <Checkbox
            status={isTutor ? 'checked' : 'unchecked'}
            onPress={() => setIsTutor(!isTutor)}
          />
          <Text style={tw`ml-2 text-base`}>I am a tutor</Text>
        </View>

        <View style={tw`flex-row justify-between w-full`}>
          <View style={tw`flex-1 mr-2`}>
            <Button title="Login" onPress={handleLogin} />
          </View>
          <View style={tw`flex-1 ml-2`}>
            <Button title="Signup (Student)" onPress={() => navigation.navigate("SignupStudent")} />
          </View>
          <View style={tw`flex-1 ml-2`}>
            <Button title="Signup (Tutor)" onPress={() => navigation.navigate("SignupTutor")} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
