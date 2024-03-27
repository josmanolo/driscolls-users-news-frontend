import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import UserList from "./components/UserList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/users"
          element={
           
              <UserList />
            
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
