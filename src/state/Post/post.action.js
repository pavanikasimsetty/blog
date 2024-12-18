import {createAsyncThunk} from '@reduxjs/toolkit';
import { api, API_BASE_URL } from "../../config/api";

export const createPost = createAsyncThunk(
    "post/createPost",
    async (postData, { rejectWithValue }) => {
        try {
            const {data} = await api.post(
                `${API_BASE_URL}/api/posts`,
                postData.data,
            );
            console.log("Post Created",data);
            return data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async ({ postId, jwt }, { rejectWithValue }) => {
      try {
        // Make DELETE request to the backend
        const response = await axios.delete(`${API_BASE_URL}/api/posts/${postId}`, {
          headers: {
            Authorization: jwt, // Add JWT token to the Authorization header
          },
        });
        console.log("Post Deleted Successfully:", response.data);
        return { postId, message: response.data.message }; // Return deleted post ID and message
      } catch (error) {
        console.error("Error Deleting Post:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "An error occurred");
      }
    }
  );

export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async (_,{ rejectWithValue }) => {
        console.log("getting all the posts");
        try {
            const {data} = await api.get(`${API_BASE_URL}/api/posts`);
            console.log("Posts Fetched",data);
            return data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUsersPosts = createAsyncThunk(
    "post/getUsersPosts",
    async (userId, { rejectWithValue }) => {
        try {
            const {data} = await api.get(`${API_BASE_URL}/api/posts/user/${userId}`);
            console.log("Posts Fetched",data);
            return data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const likePost = createAsyncThunk(
    "post/likePost",
    async (postId, { rejectWithValue }) => {
        try {
            const {data} = await api.put(`${API_BASE_URL}/api/posts/like/${postId}`);
            console.log("Post Liked",data);
            return data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);


// Comments API actions

export const createComment = createAsyncThunk(
    "post/createComment",
    async (reqData, { rejectWithValue }) => {
        try {
            const { data } = await api.post(
              `${API_BASE_URL}/api/comments/post/${reqData.postId}`,
              reqData.data
            );
            console.log("Comment Created",data);
            return data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);