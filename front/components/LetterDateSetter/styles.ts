import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.8rem;
`;

export const Bubble = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.2rem;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 1rem;

  text-align: center;

  padding: 0.5rem 1.5rem;

  &::after {
    content: '';
    position: absolute;
    top: 2.2rem;
    left: 46%;

    border-top: 10px solid rgba(0, 0, 0, 0.1);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
  }
`;
