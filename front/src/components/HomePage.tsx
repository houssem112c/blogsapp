import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const lockImage = require('../../assets/lockImage.jpeg');
const BASE_URL = 'http://10.0.2.2:5000';

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  image: string;
}

const HomePage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);  
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const navigation = useNavigation<any>();

  const fetchBlogs = async (query = '', page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://10.0.2.2:5000/api/blogs?search=${query}&page=${page}&limit=10`
      );
      if (response.data.length < 10) {
        setHasMore(false); 
      }
      setBlogs((prevBlogs) => [...prevBlogs, ...response.data]);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(searchQuery, page);
  }, [page]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setBlogs([]);  
    setPage(1);  
    setHasMore(true); 
    fetchBlogs(text, 1);
  };

  const renderBlog = ({ item }: { item: Blog }) => (
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

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hello, Name!</Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>Welcome to Blogs App</Text>
        <Text style={styles.bannerSubText}>Let's get it together</Text>
        <Image source={lockImage} style={styles.icon} />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
        data={[
          { name: 'IT', icon: 'desktop-outline' as const },
          { name: 'Scientific', icon: 'book-outline' as const },
        ]}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem}>
            <Ionicons name={item.icon} size={20} color="#fff" />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <TextInput
        style={styles.searchInput}
        placeholder="Search blogs by title"
        placeholderTextColor="#6200ee"
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </View>
  );

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item._id}
        renderItem={renderBlog}
        numColumns={2}
        contentContainerStyle={styles.blogList}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#6200ee" /> : null
        }
        onEndReached={handleLoadMore} 
        onEndReachedThreshold={0.5} 
      />
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('HomePage')}
        >
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('AddBlog')}
        >
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.navText}>Add Blog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('MyBlogs')}
        >
          <Ionicons name="book" size={24} color="#fff" />
          <Text style={styles.navText}>My Blogs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    padding: 50,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  bannerSubText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  icon: {
    width: 320,
    height: 180,
  },
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
  searchInput: {
    height: 40,
    margin: 5,
    borderColor: '#6200ee',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 2,
  },
  blogList: {
    paddingHorizontal: 10,
  },
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
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    height: 60,
    zIndex: 1,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default HomePage;
