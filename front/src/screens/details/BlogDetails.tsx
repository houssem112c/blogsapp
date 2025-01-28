import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Button } from 'react-native';
import { getBlog, deleteBlog } from '../../services/api';
import useAuthStore from '../../store';
import { BASE_URL } from '../../services/api';

const BlogDetails = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [blog, setBlog] = useState<any>(null);
  const { token } = useAuthStore(); 

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlog(id);
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog details:', err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDeleteBlog = async (blogId: string) => {
    if (!token) {
      alert('You must be logged in to delete a blog');
      return;
    }
    try {
      await deleteBlog(blogId, token);
      alert('Blog deleted successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog');
    }
  };

  const handleUpdate = () => {
    navigation.navigate('update', { id });
  };

  if (!blog) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {blog.image && (
          <Image
            source={{ uri: `${BASE_URL}${blog.image}` }}
            style={styles.blogImage}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{blog.title}</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaTag}>{blog.category}</Text>
            <Text style={styles.metaTag}>
              Published on: {new Date(blog.createdAt).toLocaleDateString('en-GB')}
            </Text>
          </View>
          <Text style={styles.aboutHeading}>About</Text>
          <Text style={styles.content}>{blog.content}</Text>
          {blog.tags && (
            <View style={styles.tagsContainer}>
              {blog.tags.map((tag: string, index: number) => (
                <Text key={index} style={styles.tag}>
                  {tag}
                </Text>
              ))}
            </View>
          )}

          <View style={styles.buttonsContainer}>
            <Button title="Update" onPress={handleUpdate} />
            <Button title="Delete" onPress={() => handleDeleteBlog(id)} color="red" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  blogImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metaTag: {
    fontSize: 14,
    color: '#888',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  aboutHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#007BFF',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default BlogDetails;
