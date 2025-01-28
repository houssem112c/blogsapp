// MyBlogs.tsx
import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchBlogs } from '../../services/api';
import BlogCard from '../../components/myblogs/BlogCards';
import useAuthStore from '../../store';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  const fetchMyBlogs = async () => {
    setLoading(true);
    if (token) {
      const response = await fetchBlogs(token);
      setBlogs(response);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      fetchMyBlogs();
    } else {
      setLoading(false);
    }
  }, [token]);

  const renderBlog = useCallback(({ item }: { item: any }) => <BlogCard blog={item} />, []);

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
          ListEmptyComponent={<Text style={styles.emptyText}>No blogs added yet.</Text>}
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
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyBlogs;
