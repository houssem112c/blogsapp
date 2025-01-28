import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import useAuthStore from '../store';  

const BASE_URL = 'http://10.0.2.2:5000';

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  image?: string;
}

const MyBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();  

  const fetchMyBlogs = async () => {
    setLoading(true);
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/blogs`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setBlogs(response.data);  

    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        useAuthStore.getState().clearUser();
      } else {
        if (axios.isAxiosError(err)) {
        } else {
        }
        console.error('Error fetching blogs:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, [token]); 

  const renderBlog = useCallback(({ item }: { item: Blog }) => (
    <View style={styles.blogCard}>
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Text style={styles.blogCategory}>{item.category}</Text>
      {item.image && (
        <Image
        source={{ uri: `${BASE_URL}${item.image}` }}
          style={{ width: '100%', height: 200, borderRadius: 10 }}
          resizeMode="cover"
        />
      )}
      <Text>{item.content}</Text>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList
          data={blogs}
          keyExtractor={(item) => item._id}
          renderItem={renderBlog}
          refreshing={loading}
          onRefresh={fetchMyBlogs}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              You haven't added any blogs yet.
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
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
});

export default MyBlogs;
