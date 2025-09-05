import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(
  apiCall: () => Promise<{ data?: T; error?: string }>,
  dependencies: any[] = []
): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const result = await apiCall();
        
        if (isMounted) {
          if (result.error) {
            setState({ data: null, loading: false, error: result.error });
          } else {
            setState({ data: result.data || null, loading: false, error: null });
          }
        }
      } catch (error) {
        if (isMounted) {
          setState({ 
            data: null, 
            loading: false, 
            error: error instanceof Error ? error.message : 'Unknown error' 
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await apiService.login(email, password);
    if (result.data) {
      setUser(result.data.user);
      return true;
    }
    return false;
  };

  const signup = async (userData: any) => {
    const result = await apiService.signup(userData);
    if (result.data) {
      setUser(result.data.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
  };

  return { user, login, signup, logout, loading };
}