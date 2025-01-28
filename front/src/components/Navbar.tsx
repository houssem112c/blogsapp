import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.navItem}>Home</Text> 
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddBlog')}>
        <Text style={styles.navItem}>Add Blog</Text> 
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyBlogs')}>
        <Text style={styles.navItem}>My Blogs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  navItem: {
    color: '#6200ee',
    fontSize: 18,
    borderRadius: 10,
  },
});

export default Navbar;
