// BlogCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BASE_URL } from '../../services/api';

interface Blog {
  title: string;
  category: string;
  image?: string;
  content: string;
}

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  return (
    <View style={styles.blogCard}>
      <Text style={styles.blogTitle}>{blog.title}</Text>
      <Text style={styles.blogCategory}>{blog.category}</Text>
      {blog.image && (
        <Image
          source={{ uri: `${BASE_URL}${blog.image}` }}
          style={styles.blogImage}
          resizeMode="cover"
        />
      )}
      <Text>{blog.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  blogCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  blogCategory: {
    fontSize: 14,
    color: '#6200ee',
    marginBottom: 10,
  },
  blogImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default BlogCard;
