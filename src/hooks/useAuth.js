import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Create a custom hook that uses AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
