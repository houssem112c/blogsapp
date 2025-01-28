import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface Blog {
  _id: string;
  title: string;
  category: string;
  image: string;
}

const BASE_URL = 'http://10.0.2.2:5000';

const BlogCard: React.FC<{ item: Blog }> = ({ item }) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.blogCard}
      onPress={() => navigation.navigate('BlogDetails', { id: item._id })}
    >
      <Image
        source={{ uri: `${BASE_URL}${item.image}` }}
        style={styles.blogImage}
      />
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Text style={styles.blogCategory}>{item.category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blogCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderBlockColor: '#6200ee',
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'visible',
  },
  blogImage: {
    width: '100%',
    height: 120,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  blogCategory: {
    fontSize: 12,
    color: '#6200ee',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default BlogCard;
