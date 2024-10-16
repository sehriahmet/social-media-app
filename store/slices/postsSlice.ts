import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ page }: { page: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://asehriyaroglu-doggo-web-task.vercel.app/api/posts?_sort=timestamp&_order=desc&_page=${page}&_per_page=10`);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchPostsByUsername = createAsyncThunk(
  'posts/fetchPostsByUsername',
  async ({ page, username }: { page: number; username: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://asehriyaroglu-doggo-web-task.vercel.app/api/posts?username=${username}&_sort=timestamp&_order=desc&_page=${page}&_per_page=10`);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface PostsState {
  posts: any[];
  page: number;
  isLoading: boolean;
  hasNextPage: boolean;
}

const initialState: PostsState = {
  posts: [],
  page: 1,
  isLoading: false,
  hasNextPage: true,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.page = 1;
      state.hasNextPage = true;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;

        const existingPostIds = new Set(state.posts.map((post) => post.id));
        const newPosts = action.payload.filter((post: any) => !existingPostIds.has(post.id));

        state.posts = [...state.posts, ...newPosts];
        state.page += newPosts.length > 0 ? 1 : 0;
        state.hasNextPage = newPosts.length > 0;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchPostsByUsername.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostsByUsername.fulfilled, (state, action) => {
        state.isLoading = false;

        const existingPostIds = new Set(state.posts.map((post) => post.id));
        const newPosts = action.payload.filter((post: any) => !existingPostIds.has(post.id));

        state.posts = [...state.posts, ...newPosts];
        state.page += newPosts.length > 0 ? 1 : 0;
        state.hasNextPage = newPosts.length > 0;
      })
      .addCase(fetchPostsByUsername.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetPosts } = postsSlice.actions;

export default postsSlice.reducer;