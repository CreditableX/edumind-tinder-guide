import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';
import useAuth from '../../hooks/useAuth';
import useUserProfile from '../../hooks/userProfileProvider';

const StudentChangeDetailsScreen = () => {
    const { name, username, email } = useAuth();
    const { updateDetailsStudent } = useUserProfile();
    const navigation = useNavigation();
    const { logout } = useAuth();
    const [newName, setNewName] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        // Set the initial state when the component mounts
        setNewName(name);
        setNewUsername(username);
        setNewEmail(email);
    }, [name, username, email]); // Only run this effect on initial mount or if these values change

    const handleUpdateDetails = async (nameState, usernameState, emailState) => {
        try {
            await updateDetailsStudent(nameState, usernameState, emailState);
            Alert.alert('Profile updated successfully. Please relogin');
            logout(); // Logout user if successful
        } catch (error) {
            Alert.alert('Name update error', error.message); // Display error message if chat creation fails
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* Fields for change */}
            <Text style={tw`mb-4 text-lg font-bold`}>Input the following details</Text>
            <TextInput
                placeholder="Username"
                value={newUsername}
                onChangeText={setNewUsername}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <TextInput
                placeholder="Name"
                value={newName}
                onChangeText={setNewName}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />
            <TextInput
                placeholder="Email"
                value={newEmail}
                onChangeText={setNewEmail}
                style={{ marginBottom: 16, borderWidth: 1, padding: 8, width: '80%' }}
            />

            <View style={tw`flex-row justify-between w-4/5`}>
                {/* Submit and back buttons */}
                <View style={tw`flex-1 ml-2 mb-5`}>
                    <Button title="Submit" mode="contained" style={tw`mb-1`} onPress={() => handleUpdateDetails(newName, newUsername, newEmail)}> Submit </Button>
                    <Button title="Never Mind" mode="contained" style={tw`mb-1`}  onPress={() => navigation.navigate("StudentProfile")}> Never Mind </Button>
                </View>
            </View>
        </View>
    );
}

export default StudentChangeDetailsScreen