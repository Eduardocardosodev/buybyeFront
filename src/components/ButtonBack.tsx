import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onClick?: () => void;
  label: string;
}

const ButtonBack: React.FC<Props> = ({ onClick, label }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <button type="submit" onClick={handleGoBack}>
      {label}
    </button>
  );
};

export default ButtonBack;
