import axios from 'axios';
export const BASE_URL = 'http://10.0.2.2:5000'; 

export const API_URL = 'http://10.0.2.2:5000/api/blogs';

interface BlogData {
  title: string;
  content: string;
  category: string;
  tags: string;
  imageUri: string | null;
}

export const handleAddBlog = async (
  { title, content, category, tags, imageUri }: BlogData,
  token: string | null
) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('category', category);
  formData.append('tags', tags);

  if (imageUri) {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    formData.append('image', blob, 'image.jpg');
  }

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Server error');
    }
  }
};

export const fetchBlogs = async (query = '', page = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/blogs?search=${query}&page=${page}&limit=10`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  };

  export const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/api/login', { email, password });
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  export const signupUser = async (email: string, password: string) => {
      try {
        const response = await axios.post(`${BASE_URL}/register`, {
          email,
          password,
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    };

    // Fetch a single blog post by ID
export const getBlog = async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/blogs/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error fetching blog details: ' + error.message);
      } else {
        throw new Error('Error fetching blog details');
      }
    }
  };
  
  // Delete a blog post
  export const deleteBlog = async (id: string, token: string) => {
    try {
      await axios.delete(`${BASE_URL}/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error deleting blog: ' + error.message);
      } else {
        throw new Error('Error deleting blog');
      }
    }
  };
  export const fetchBlogss = async (token: string) => {
      if (!token) return [];
      
      try {
        const response = await axios.get(`${BASE_URL}/api/blogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (err) {
        console.error('Error fetching blogs:', err);
        return [];
      }
    };