import React, { FormEvent, useContext, useState } from 'react';
import { Container } from '../styles/RegisterPageStyles';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthProvider';

const LoginPage = () => {
  const { authenticated, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [senha, setSenha] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, senha).catch((response) => {
      console.log(response.response.data.error);
      setErrors([response.response.data.error]);
    });
  };

  return (
    <>
      <Container method="post" onSubmit={handleSubmit}>
        <div className="centerForm">
          <div>
            <h1>Registre-se</h1>
          </div>
          <div>
            <input
              type="email"
              placeholder="E-mail do Competidor"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Senha do Competidor"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div>
            <input type="password" placeholder="Confirme sua senha" />
          </div>
          <button type="submit">Cadastre-se</button>
        </div>
      </Container>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </ul>
      )}
    </>
  );
};

export default LoginPage;
