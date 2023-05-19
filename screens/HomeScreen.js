import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DisplayMenu from '../DisplayMenu'
//import DisplayMenu from '../DisplayMenu2'

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const handlePress = () => {navigation.navigate('Profile'); };
  const handlePress2 = () => {navigation.navigate('Onboarding'); };


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
            <Image
             source={require('../logo.png')}
             style={styles.logo}
            />
             <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Go to Profile</Text>
            </TouchableOpacity>
      
            <DisplayMenu />          
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  logo: {
    width: 250,
    height: 50,
    resizeMode: "contain",
  },
  headerText: {
  marginTop: 100,
    fontSize: 20,
    fontWeight: 'bold',
  },
  moduleText: {
    margin: 20,
    fontFamily: 'Karla',
    fontSize: 18,
  },
   button: {
    backgroundColor: '#495E57',
    padding: 10,
    borderRadius: 5,
    width:200,
    marginLeft:100,
    marginTop:10,
    marginBottom:10,
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  
});

export default HomeScreen;
