import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchBlogs } from '../../services/api';
import BlogCard from '../../components/home/BlogCard';
import Header from '../../components/home/Header';
import CategoryList from '../../components/home/CategoryList';
import Navbar from '../../components/Navbar'; // Import Navbar

const HomePage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation<any>();

  const loadBlogs = async (query: string, page: number) => {
    setLoading(true);
    try {
      const data = await fetchBlogs(query, page);
      if (data.length < 10) setHasMore(false);
      setBlogs((prevBlogs) => [...prevBlogs, ...data]);
    } catch (err) {
      console.error('Error loading blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // This will trigger when the screen is focused
      loadBlogs(searchQuery, 1); // Reset to page 1 when reloaded
      setBlogs([]); // Clear previous blogs
      setPage(1); // Reset the page
      setHasMore(true); // Reset "hasMore" flag
    }, [searchQuery]) // The searchQuery is a dependency, so it'll reload data when it changes
  );

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Header searchQuery={searchQuery} handleSearch={handleSearch} />
      <CategoryList />
      <FlatList
        data={blogs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <BlogCard item={item} />}
        numColumns={2}
        contentContainerStyle={styles.blogList}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#6200ee" /> : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingBottom: 60,
  },
  blogList: {
    paddingHorizontal: 10,
  },
});

export default HomePage;
