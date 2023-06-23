import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.css';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import { AuthContext, AuthProvider } from './context/auth/AuthProvider';
import { ReactNode, useContext } from 'react';
import HomePage from './Pages/HomePage';

interface AuthProviderProps {
  children: ReactNode;
}

function App() {
  const Private = ({ children }: AuthProviderProps) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div>CARREGANDO...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
