import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../styles/RegisterPageStyles';
import axios from 'axios';

const RegisterPage = () => {
  const [nome_competidor, setNome_competidor] = useState<string>('');
  const [nivel_cabeca, setNivel_cabeca] = useState<number>(0);
  const [nivel_pe, setNivel_pe] = useState<number>(0);
  const [senha, setSenha] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      nome_competidor,
      nivel_cabeca,
      nivel_pe,
      senha,
      email,
    };

    axios
      .post('http://localhost:3003/competidor/', formData)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
        console.log('errro');
      });
  };

  return (
    <Container method="post" onSubmit={handleSubmit}>
      <div className="centerForm">
        <div>
          <h1>Registre-se</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="Nome do Competidor"
            value={nome_competidor}
            onChange={(e) => setNome_competidor(e.target.value)}
          />
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
            type="number"
            placeholder="Nivel Cabeca"
            value={nivel_cabeca}
            onChange={(e) => setNivel_cabeca(parseInt(e.target.value))}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Nivel pe"
            value={nivel_pe}
            onChange={(e) => setNivel_pe(parseInt(e.target.value))}
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
  );
};

export default RegisterPage;
