import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const UpdateBlog = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [blog, setBlog] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'http://10.0.2.2:5000'; 

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        
        const response = await axios.get(`${BASE_URL}/api/blogs/${id}`);
        setBlog(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
        setTags(response.data.tags.join(', ')); 
        setCategory(response.data.category);
      } catch (err:any) {
        
        console.error('Error fetching blog details:', err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedBlog = {
        title,
        content,
        tags: tags.split(',').map((tag: string) => tag.trim()),
        category,
      };
      await axios.put(`${BASE_URL}/api/blogs/${id}`, updatedBlog);
      navigation.goBack(); 
    } catch (err) {
      console.error('Error updating blog:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!blog) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Update Blog</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Tags (comma separated)"
          value={tags}
          onChangeText={setTags}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />


        <Button title="Update Blog" onPress={handleUpdate} />
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
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default UpdateBlog;
