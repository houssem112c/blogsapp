import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import AuthState from '../../store';
import BlogInput from './BlogInput';
import PickImageButton from './PickImageButton';
import { handleAddBlog } from '../../services/api';

const AddBlog: React.FC = () => {
  const { token } = AuthState();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleFormSubmit = () => {
    if (!token) {
      Alert.alert('Error', 'You must be logged in to add a blog');
      return;
    }

    handleAddBlog({ title, content, category, tags, imageUri }, token)
      .then(() => {
        Alert.alert('Blog created successfully!');
      })
      .catch((err) => {
        Alert.alert('Failed to create blog', err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Blog</Text>
      <BlogInput label="Title" value={title} onChangeText={setTitle} />
      <BlogInput label="Content" value={content} onChangeText={setContent} />
      <BlogInput label="Category" value={category} onChangeText={setCategory} />
      <BlogInput label="Tags" value={tags} onChangeText={setTags} />
      
      <PickImageButton onImagePicked={setImageUri} />

      <Text style={styles.button} onPress={handleFormSubmit}>Add Blog</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
});

export default AddBlog;
