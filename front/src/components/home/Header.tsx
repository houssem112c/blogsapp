import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const lockImage = require('../../../assets/lockImage.jpeg');

interface HeaderProps {
  searchQuery: string;
  handleSearch: (text: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, handleSearch }) => (
  <View>
  

    <View style={styles.banner}>
      <Text style={styles.bannerText}>Welcome to Blogs App</Text>
      <Text style={styles.bannerSubText}>Let's get it together</Text>
      <Image source={lockImage} style={styles.icon} />
    </View>

    <TextInput
      style={styles.searchInput}
      placeholder="Search blogs by title"
      placeholderTextColor="#6200ee"
      value={searchQuery}
      onChangeText={handleSearch}
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#fff',
  },
  banner: {
    backgroundColor: '#6200ee',
    padding: 50,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  bannerSubText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  icon: {
    width: 320,
    height: 180,
  },
  searchInput: {
    height: 40,
    margin: 5,
    borderColor: '#6200ee',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 2,
  },
});

export default Header;
