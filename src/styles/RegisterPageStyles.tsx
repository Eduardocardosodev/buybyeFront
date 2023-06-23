import styled from 'styled-components';

export const Container = styled.form`
  height: 525px;
  width: 400px;
  background-color: #0c0c0c;
  border-color: #4b004b;
  border: 1px solid #4b004b;
  border-radius: 10px;

  .centerForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  h1 {
    font-size: 1.8rem;
  }

  input {
    margin-top: 30px;
    height: 30px;
    width: 100%;
  }

  button {
    margin-top: 50px;
  }
`;
