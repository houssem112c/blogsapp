import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AddBlog from '../../components/AddBlog/AddBlog';

const AddBlogScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AddBlog />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AddBlogScreen;
