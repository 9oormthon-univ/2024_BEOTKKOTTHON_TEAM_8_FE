import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const OptionWrapper = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 3.2rem;

  &:hover {
    background-color: #b2b2b2;
  }
`;
