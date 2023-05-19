import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const navigation = useNavigation();

 useEffect(() => {
 const getNameAndEmail = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      const storedEmail = await AsyncStorage.getItem('email');
    if (storedName !== null) {
      setName(storedName);
    }
    if (storedEmail !== null) {
    setEmail(storedEmail);
    }
    } catch (error) {
    // handle error here
    }
 };
 getNameAndEmail();
 }, []);

 return (
    <View style={styles.container}>
      <Image source={require('../Profile.png')} style={styles.profileImage} />
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Email: {email}</Text>
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

    </View>
 );
};

const styles = StyleSheet.create({
 container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
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
});

export default ProfileScreen;
