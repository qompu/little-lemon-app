import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DisplayMenu from '../DisplayMenu'
//import DisplayMenu from '../DisplayMenu2'
import Header from '../include/Header'

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');



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
      <Header style={styles} navigation={navigation} profileButton={true} />

      <View style={styles.container}> 
      <DisplayMenu /> 
      </View>
       
               
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  
});

export default HomeScreen;