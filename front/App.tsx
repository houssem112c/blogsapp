import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './src/screens/signup/Signup';
import Login from './src/screens/login/Login';
import HomePage from './src/screens/home/HomePage';
import AddBlog from './src/screens/add/AddBlogScreen';
import BlogDetails from './src/screens/details/BlogDetails';
import MyBlogs from './src/screens/myblogs/MyBlogs';
import updates from './src/components/update/UpdateBlog';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="AddBlog" component={AddBlog} />
        <Stack.Screen name="BlogDetails" component={BlogDetails} />
        <Stack.Screen name="MyBlogs" component={MyBlogs} />
        <Stack.Screen name="update" component={updates} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
