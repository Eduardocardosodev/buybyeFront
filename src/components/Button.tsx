import React from 'react';

interface Props {
  onClick: () => void;
  label: string;
}

const Button: React.FC<Props> = ({ onClick, label }) => {
  return (
    <button type="submit" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
