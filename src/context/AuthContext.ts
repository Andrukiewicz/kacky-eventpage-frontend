import { createContext } from 'react';

// Interface for authentication props
export interface AuthContextProps {
  isLoggedIn: boolean;
  token: string;
  expires: number;
}

// Interface for authentication useContext
export type AuthContextStateProps = {
  authentication: AuthContextProps;
  setAuthentication: React.Dispatch<React.SetStateAction<AuthContextProps>>;
};

const defaultAuthState: AuthContextStateProps = {
  authentication: { isLoggedIn: false, token: '', expires: 0 },
  setAuthentication: () => {},
};

// Create the context with an initial state
const AuthContext = createContext<AuthContextStateProps>(defaultAuthState);

export default AuthContext;
