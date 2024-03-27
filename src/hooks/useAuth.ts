import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setCredentials, setLogout } from "../state/auth.slice";
import { User } from "../types";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const login = (user: User, token: string) => {
    dispatch(setCredentials({ user, token }));
  };

  const logout = () => {
    dispatch(setLogout());
  };

  return {
    isAuthenticated,
    user,
    token,
    login,
    logout,
  };
};
