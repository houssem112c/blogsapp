import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; 
import useAuthStore from '../store';

const AddBlog = () => {
  const { token } = useAuthStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Permission to access the media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAddBlog = async (title: string | Blob, content: string | Blob, category: string | Blob, tags: string | Blob, imageUri: any, token: any) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('tags', tags);
  
    if (imageUri) {
      const imageBlob = {
        uri: imageUri,
        type: 'image/jpeg', 
        name: 'image.jpg', 
      } as any;
      formData.append('image', imageBlob);
    }
  
    
    try {
      const response = await axios.post('http://10.0.2.2:5000/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
  
      Alert.alert('Blog created successfully!');
    } catch (err) {
      if ((err as any).response) {
        console.error('Error response:', (err as any).response.data);
        Alert.alert('Failed to create blog', 'Server error: ' + (err as any).response.data.message);
      } else if ((err as any).request) {
        console.error('Request error:', (err as any).request);
        Alert.alert('Failed to create blog', 'No response from server');
      } else {
        console.error('General error:', (err as any).request);
        Alert.alert('Failed to create blog', 'Error: ' + (err as any).message);
      }
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Alert.alert('Back pressed')} style={styles.backButton}>
      </TouchableOpacity>
        
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#6e6e6e" style={styles.icon} />
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="call" size={20} color="#6e6e6e" style={styles.icon} />
        <TextInput
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="folder" size={20} color="#6e6e6e" style={styles.icon} />
        <TextInput
          placeholder="Category (e.g., IT, Scientific)"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="pricetag" size={20} color="#6e6e6e" style={styles.icon} />
        <TextInput
          placeholder="Tags (comma-separated)"
          value={tags}
          onChangeText={setTags}
          style={styles.input}
        />
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.pickImageButton}>
        <Text style={styles.pickImageText}>pick image</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      <TouchableOpacity onPress={() => handleAddBlog(title, content, category, tags, imageUri, token)} style={styles.addButton}>
        <Text style={styles.addButtonText}>add blog</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
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
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  pickImageButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  pickImageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddBlog;
