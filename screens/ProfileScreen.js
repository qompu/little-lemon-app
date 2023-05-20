import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');
 const [nameError, setNameError] = useState(null);
 const [emailError, setEmailError] = useState(null);
 const [phoneError, setPhoneError] = useState(null);
 const navigation = useNavigation();

 useEffect(() => {
 const getNameAndEmailAndPhone = async () => {
 try {
 const storedName = await AsyncStorage.getItem('name');
 const storedEmail = await AsyncStorage.getItem('email');
 const storedPhone = await AsyncStorage.getItem('phone');
 if (storedName !== null) {
     setName(storedName);
    }
 if (storedEmail !== null) {
     setEmail(storedEmail);
    }
 if (storedPhone !== null) {
     setPhone(storedPhone);
    }
 } catch (error) {
 // handle error here
 }
 };
 getNameAndEmailAndPhone();
 }, []);

 const validateName = (text) => {
 if (text.length < 3) {
     setNameError('Name must be at least 3 characters long');
   } else {
    setNameError(null);
   }
   setName(text);
 };

 const validateEmail = (text) => {
 if (!text.includes('@')) {
    setEmailError('Email must contain @ symbol');
   } else {
   setEmailError(null);
 }
 setEmail(text);
 };

 const validatePhone = (text) => {
 if (text.length !== 10) {
    setPhoneError('Phone number must be 10 digits long');
   } else {
   setPhoneError(null);
 }
 setPhone(text);
 };

 const handleUpdate = async () => {
   try {
   await AsyncStorage.setItem('name', name);
   await AsyncStorage.setItem('email', email);
   await AsyncStorage.setItem('phone', phone);
   Alert.alert('Profile Updated!');
   } catch (error) {
   // handle error here
   }
 };

 const handleLogout = async () => {
   try {
   await AsyncStorage.clear();
   navigation.navigate('Onboarding');
   } catch (error) {
 // handle error here
   }
 };

 return (
 <View style={styles.container}>
     <Image source={require('../Profile.png')} style={styles.profileImage} />
     <Text style={styles.label}>Name:</Text>
     <TextInput
     style={styles.input}
     value={name}
     onChangeText={validateName}
     />
     {nameError && <Text style={styles.error}>{nameError}</Text>}
      <Text style={styles.label}>Email:</Text>
     <TextInput
     style={styles.input}
     value={email}
     onChangeText={validateEmail}
     />
     {emailError && <Text style={styles.error}>{emailError}</Text>}
    <Text style={styles.label}>Phone:</Text>
    <TextInput
    style={styles.input}
    value={phone}
    onChangeText={validatePhone}
    keyboardType="numeric"
    />
    {phoneError && <Text style={styles.error}>{phoneError}</Text>}
    <TouchableOpacity
    style={[styles.button, styles.updateButton]}
    onPress={handleUpdate}
    >
    <Text style={styles.buttonText}>Update</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.button}
    onPress={() => navigation.navigate('Onboarding')}
    >
    <Text style={styles.buttonText}>Go to Onboarding</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.button}
    onPress={() => navigation.navigate('Home')}
    >
    <Text style={styles.buttonText}>Go to Home Page</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={[styles.button, styles.logoutButton]}
    onPress={handleLogout}
    >
    <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
 </View>
 );
};

const styles = StyleSheet.create({
 container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 },
 label: {
 textAlign: 'left',
 fontFamily: 'Karla',
 fontSize: 18,
 },
 input: {
 borderWidth: 1,
 borderColor: '#495E57',
 padding: 10,
 marginVertical: 10,
 width: '80%',
 borderRadius: 5,
 },
 error: {
 color: 'red',
 textAlign: 'center',
 fontFamily: 'Karla',
 fontSize: 16,
 },
 text: {
 textAlign: 'center',
 fontFamily: 'Karla',
 fontSize: 21,
 },
 profileImage: {
 width: 100,
 height: 100,
 },
 button: {
 backgroundColor: '#495E57',
 padding: 10,
 borderRadius: 5,
 marginVertical: 10,
 },
 buttonText: {
 color: '#fff',
 textAlign: 'center',
 },
 updateButton: {
 backgroundColor: '#00FF00',
 },
 logoutButton: {
 backgroundColor: '#FF0000',
 },
});

export default ProfileScreen;