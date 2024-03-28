import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FAILED, IDLE, LOADING, SUCCEEDED } from "./status";

interface NewsItem {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  id: string;
}

interface NewsState {
  items: NewsItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: NewsState = {
  items: [],
  status: IDLE,
  error: null,
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: "us",
          apiKey: "773a2ceacdab4a1da691f8de38d80261",
        },
      });

      const hashCode = (s: string) =>
        Math.abs(
          s.split("").reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
          }, 0)
        ).toString();

      const newsWithIds = response.data.articles
        .map((article: any) => {
          const id = hashCode(`${article.publishedAt}_${article.title}`);

          return {
            ...article,
            id,
          };
        })
        .filter(
          (article: any) =>
            article.content && article.description && article.urlToImage
        );
      return newsWithIds;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.items = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      });
  },
});

const { reducer: newsReducer } = newsSlice;
export default newsReducer;
