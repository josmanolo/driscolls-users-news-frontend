import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "../state/auth.slice";
import userReducer from "../state/user.slice";
import newsReducer from "../state/news.slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        news: newsReducer,
    }
});

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;