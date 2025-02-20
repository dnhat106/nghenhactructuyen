import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxBLJuaRNTJpQjGQNgxUkF_kPQ5nKkNrI",
  authDomain: "music-app-b0aa2.firebaseapp.com",
  projectId: "music-app-b0aa2",
  storageBucket: "music-app-b0aa2.appspot.com",
  messagingSenderId: "485901583277",
  appId: "1:485901583277:web:5a0d7a0bd8e14c9e8e2a9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Email/Password sign in
  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google sign in
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Zalo sign in
  const loginWithZalo = async () => {
    try {
      setLoading(true);
      // Initialize Zalo SDK
      const zalo = window.ZaloSocial;
      
      return new Promise((resolve, reject) => {
        zalo.init({
          appId: 'YOUR_ZALO_APP_ID',
          redirectUrl: window.location.origin,
        });

        zalo.login((response) => {
          if (response.status === 'connected') {
            // Get user info from Zalo
            zalo.api('/me', 'GET', {}, (response) => {
              if (response.error) {
                reject(response.error);
              } else {
                // Create custom user object for Zalo
                const zaloUser = {
                  uid: response.id,
                  displayName: response.name,
                  photoURL: response.picture.data.url,
                  email: null, // Zalo doesn't provide email
                  provider: 'zalo'
                };
                setUser(zaloUser);
                resolve(zaloUser);
              }
            });
          } else {
            reject(new Error('Zalo login failed'));
          }
        });
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (songId) => {
    setFavorites(prev => [...prev, songId]);
  };

  const removeFromFavorites = (songId) => {
    setFavorites(prev => prev.filter(id => id !== songId));
  };

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    loginWithZalo,
    register,
    logout,
    addToFavorites,
    removeFromFavorites,
    favorites
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
