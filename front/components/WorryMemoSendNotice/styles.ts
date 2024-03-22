import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 5rem;
`;

export const Text = styled.h1`
  font-weight: 400;
  font-size: 2rem;
  line-height: 20px;
  text-align: center;

  color: rgba(0, 0, 0, 0.5);
`;

export const Button = styled.button`
  cursor: pointer;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  border: none;

  font-family: 'ChosunNM';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  text-align: center;

  padding: 1rem 2.5rem;
  color: rgba(0, 0, 0, 0.5);
`;
