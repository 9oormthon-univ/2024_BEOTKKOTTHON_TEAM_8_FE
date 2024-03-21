import styled from 'styled-components';

export const Containter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
`;

export const ButtonWrapper = styled.div`
  width: 100%;

  cursor: pointer;
  display: flex;
  justify-content: end;

  margin-right: 4rem;
`;
