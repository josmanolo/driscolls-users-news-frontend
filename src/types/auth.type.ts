export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  password?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}
