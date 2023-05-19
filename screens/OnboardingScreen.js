import React, { useState } from 'react';
import {
 TextInput,
 View,
 Button,
 StyleSheet,
 Text,
 Image,
 Pressable,
 Alert,
 KeyboardAvoidingView,
 Platform,
 Keyboard
} from "react-native"

import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen = ({ navigation }) => {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [errors, setErrors] = useState({});

 const handleOnboardingComplete = async () => {
    // reset errors
    setErrors({});

    // validate name
    if (!name) {
    setErrors(errors => ({ ...errors, name: 'Name is required' }));
    return;
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
    setErrors(errors => ({ ...errors, name: 'Name must contain only letters and spaces' }));
    return;
    }

    // validate email
    if (!email) {
    setErrors(errors => ({ ...errors, email: 'Email is required' }));
    return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    setErrors(errors => ({ ...errors, email: 'Email is invalid' }));
    return;
    }

    try {
       await AsyncStorage.setItem('name', name);
       await AsyncStorage.setItem('email', email);
       Keyboard.dismiss();
       setTimeout(() => {
       navigation.navigate('Home');
       }, 500); // delay added to allow homescreen to load
    } catch (error) {
   // handle error here
    }
 };

 return (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
    >
    <View style={styles.container}>
    <Image source={require('../logo.png')} style={styles.profileImage} />
    <Text style={styles.moduleText}>Onboarding</Text>
    <TextInput
       style={styles.input}
       placeholder="Name"
       value={name}
       onChangeText={setName}
    />
    {errors.name && <Text>{errors.name}</Text>}
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
    />
    {errors.email && <Text>{errors.email}</Text>}
    <Button
    title="Complete Onboarding"
    onPress={handleOnboardingComplete}
    color="#495E57"
    />
    </View>
  </KeyboardAvoidingView>
 );
};

const styles = StyleSheet.create({
 container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 },
 input: {
 margin: 20,
 },
 moduleText: {
 fontFamily: 'Karla',
 fontSize: 18, 
 },
 profileImage: {
 height: 50,
 margin: 10,
 },
});

export default OnboardingScreen;
