import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";
import News from "./components/News";
import NewsDetails from "./components/NewsDetail";
import { RootState, useAppDispatch } from "./app/store";
import { useEffect } from "react";
import { setAuthToken, setAuthUser } from "./state/auth.slice";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";

function App() {
  const dispatch = useAppDispatch();
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token && !user) {
      const storedToken = sessionStorage.getItem("authToken");
      const storedUser = sessionStorage.getItem("user");

      if (storedToken) {
        dispatch(setAuthToken(storedToken));
      }
      if (storedUser) {
        const user = JSON.parse(storedUser);
        dispatch(setAuthUser(user));
      }
    }
  }, [dispatch, token, user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Layout>
                <UserList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <PrivateRoute>
              <Layout>
                <UserProfile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/news"
          element={
            <PrivateRoute>
              <Layout>
                <News />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/news/:id"
          element={
            <PrivateRoute>
              <Layout>
                <NewsDetails />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
