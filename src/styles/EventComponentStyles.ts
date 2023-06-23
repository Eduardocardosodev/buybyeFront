import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0;
    font-size: 24px;
    color: #333;
  }

  p {
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;
  }

  h4 {
    margin: 20px 0 10px;
    font-size: 20px;
    color: #333;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    font-size: 16px;
    color: #555;
  }

  li::before {
    content: '- ';
  }
`;
