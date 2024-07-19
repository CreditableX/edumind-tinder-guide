import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentHomeScreen from './screens/student/StudentHomeScreen';
import StudentChatScreen from './screens/student/StudentChatScreen';
import LoginScreen from './screens/LoginScreen';
import SignupStudentScreen from './screens/SignupStudentScreen';
import SignupTutorScreen from './screens/SignupTutorScreen';
import NewChatScreen from './screens/student/NewChatScreen';
import useAuth from './hooks/useAuth';
import StartUpScreen from './screens/StartUpScreen';
import StudentProfileScreen from './screens/student/StudentProfileScreen';
import SingleChatScreen from './screens/SingleChatScreen';
import ChangeDetailsScreen from './screens/ChangeDetailsScreen';
import TutorHomeScreen from './screens/tutor/TutorHomeScreen';
import TutorProfileScreen from './screens/tutor/TutorProfileScreen';
import BrowseQuestionsScreen from './screens/tutor/BrowseQuestionsScreen';
import TutorChatScreen from './screens/tutor/TutorChatScreen';
import AcceptQuestionScreen from './screens/tutor/AcceptQuestionScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { username, userType } = useAuth();
  const [currentUser, setCurrentUser] = useState(username);

  useEffect(() => {
    setCurrentUser(username);
    console.log(username);
  }, [username]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {currentUser ? (
        userType == 'student' ? (
          <>
            <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
            <Stack.Screen name="StudentChat" component={StudentChatScreen} />
            <Stack.Screen name="NewChat" component={NewChatScreen} />
            <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
            <Stack.Screen name="SingleChat" component={SingleChatScreen} />
            <Stack.Screen name="ChangeDetails" component={ChangeDetailsScreen} />
          </>
        ) : userType == 'tutor' ? (
          <>
            <Stack.Screen name="TutorHome" component={TutorHomeScreen} />
            <Stack.Screen name="TutorChat" component={TutorChatScreen} />
            <Stack.Screen name="BrowseQuestions" component={BrowseQuestionsScreen} />
            <Stack.Screen name="TutorProfile" component={TutorProfileScreen} />
            <Stack.Screen name="SingleChat" component={SingleChatScreen} />
            <Stack.Screen name="ChangeDetails" component={ChangeDetailsScreen} />
            <Stack.Screen name="AcceptQuestion" component={AcceptQuestionScreen} />
          </>
        ) : (
          <Stack.Screen name="Default" component={DefaultScreen} />
        )
      ) : (
        <>
          <Stack.Screen name="StartUp" component={StartUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignupStudent" component={SignupStudentScreen} />
          <Stack.Screen name="SignupTutor" component={SignupTutorScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const DefaultScreen = () => (
  <View>
    <Text>Loading...</Text>
  </View>
);

export default StackNavigator;
