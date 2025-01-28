import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './src/components/Signup'; 
import Login from './src/components/Login'; 
import HomePage from './src/components/HomePage'; 
import AddBlog from './src/components/AddBlog'; 
import BlogDetails from './src/components/BlogDetails'; 
import MyBlogs from './src/components/MyBlogs';  
import updates from './src/components/UpdateBlog';  

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
};