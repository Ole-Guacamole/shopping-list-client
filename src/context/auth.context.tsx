import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import authService from '../services/auth.service';
import { User } from '../types'; // Import User interface

// Define the shape of the AuthContext
interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  authenticateUser: () => void;
  logOutUser: () => void;
}

// Create the AuthContext with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for AuthProviderWrapper
interface AuthProviderWrapperProps {
  children: ReactNode;
}

// AuthProviderWrapper component without using React.FC
const AuthProviderWrapper = ({ children }: AuthProviderWrapperProps): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  // Function to authenticate the user
  const authenticateUser = async () => {
    const storedToken = localStorage.getItem('authToken');

    if (!storedToken) {
      // If no token, set loading to false and user to null
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      return;
    }

    try {
      // Verify the token
      const response = await authService.verify();
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      // Set loading to false after attempting verification
      setIsLoading(false);
    }
  };

  // Function to log out the user
  const logOutUser = () => {
    localStorage.removeItem('authToken');
    authenticateUser(); // Re-authenticate to reset context state
  };

  // useEffect to authenticate user on component mount
  useEffect(() => {
    authenticateUser();
  }, []);

  // Return the AuthContext provider with the state and functions
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        authenticateUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProviderWrapper');
  }

  return context;
};

// Export the AuthProviderWrapper, AuthContext, and useAuth
export { AuthProviderWrapper, useAuth };
