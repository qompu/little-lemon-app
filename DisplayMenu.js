import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { init, insertMenu, fetchMenu } from './database';

const url = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const DisplayMenu = () => {
 const [menuData, setMenuData] = useState([]);
 const [filteredData, setFilteredData] = useState([]);
 const [searchText, setSearchText] = useState('');
 const [debouncedSearchText, setDebouncedSearchText] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('all');

 init()
    .then(() => {
       fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.menu.forEach(item => {
      insertMenu(item.name,item.price,item.description,item.image,item.category);
      });
    })
    .catch((err) => {
    console.log(err);
    });
    })
    .catch((err) => {
    console.log(err);
    });

 useEffect(() => {
    fetchMenu()
      .then((result) => {
      setMenuData(result.rows._array);
      setFilteredData(result.rows._array);
    })
    .catch((err) => {
    console.log(err);
    });
    }, []);

 useEffect(() => {
    let data = menuData;
    if (selectedCategory !== 'all') {
      data = data.filter(item => item.category === selectedCategory);
    }
    if (debouncedSearchText) {
      data = data.filter(item => item.name.toLowerCase().includes(debouncedSearchText.toLowerCase()));
    }
    setFilteredData(data);
    }, [selectedCategory, debouncedSearchText]);

 useEffect(() => {
    const timeoutId = setTimeout(() => {
    setDebouncedSearchText(searchText);
    }, 1000);  // delay used for system to stabilize
 return () => clearTimeout(timeoutId);
  }, [searchText]);

 const handleCategoryPress = (category) => {
    setSelectedCategory(category);
 };

 const handleSearchChange = (text) => {
    setSearchText(text);
 };

 return (
   <View style={styles.container}>
   <View style={styles.header}>
   <Text style={styles.headerButton} onPress={() => handleCategoryPress('all')}>All</Text>
   <Text style={styles.headerButton} onPress={() => handleCategoryPress('starters')}>Starters</Text>
   <Text style={styles.headerButton} onPress={() => handleCategoryPress('mains')}>Mains</Text>
   <Text style={styles.headerButton} onPress={() => handleCategoryPress('desserts')}>Desserts</Text>
   </View>
   <TextInput
      style={styles.searchInput}
      onChangeText={handleSearchChange}
      value={searchText}
      placeholder="Search"
   />
   <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
      <View style={styles.listItem}>
      <Text style={styles.listItemName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>{item.price}</Text>
      </View>
      )}
   />
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
 flex: 1,
 paddingTop: 50,
 },
 header: {
 flexDirection: 'row',
 justifyContent: 'space-around',
 marginBottom: 10,
 },
 headerButton: {
 fontSize: 18,
 fontWeight: 'bold',
 },
 searchInput: {
 height: 40,
 marginHorizontal: 20,
 marginBottom: 10,
 paddingHorizontal: 10,
 borderColor: 'gray',
 borderWidth: 1,
 borderRadius: 5,
 },
 listItem: {
 paddingVertical: 10,
 paddingHorizontal: 20,
 borderBottomColor: 'lightgray',
 borderBottomWidth: 1,
 },
 listItemName: {
 fontSize: 18,
 fontWeight: 'bold',
 marginBottom: 5,
 },
});

export default DisplayMenu;
