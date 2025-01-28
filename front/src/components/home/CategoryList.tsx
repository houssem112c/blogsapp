import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CategoryList: React.FC = () => {
  const categories = [
    { name: 'IT', icon: 'desktop-outline' as const },
    { name: 'Scientific', icon: 'book-outline' as const },
  ];

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryScroll}
      data={categories}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.categoryItem}>
          <Ionicons name={item.icon} size={20} color="#fff" />
          <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  categoryScroll: {
    paddingHorizontal: 20,
    height: 100,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 50,
    marginRight: 5,
    height: 40,
  },
  categoryText: {
    color: '#fff',
    marginLeft: 20,
  },
});

export default CategoryList;
