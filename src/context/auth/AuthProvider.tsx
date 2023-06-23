import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { api, createSession } from '../../services/api';

interface Competitor {
  id: number;
  nome_competidor: string;
  nivel_cabeca: number;
  nivel_pe: number;
  senha: string;
  email: string;
}

interface AuthContextData {
  authenticated: boolean;
  competitor: Competitor | null;
  loading: boolean;
  login: (senha: string, email: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [competitor, setCompetitor] = useState<Competitor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const recoveredCompetitor = localStorage.getItem('competitor');

    if (recoveredCompetitor && token) {
      setCompetitor(JSON.parse(recoveredCompetitor));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    const response = await createSession(email, senha);
    const loggedUser = response.data.competitor;

    console.log(loggedUser);

    const token = response.data.token;

    localStorage.setItem('competitor', JSON.stringify(loggedUser));
    localStorage.setItem('token', token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setCompetitor(loggedUser);
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('competitor');
    localStorage.removeItem('token');

    api.defaults.headers.Authorization = null;
    setCompetitor(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!competitor,
        competitor,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
