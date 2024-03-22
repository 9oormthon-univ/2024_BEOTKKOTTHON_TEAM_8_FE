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

  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: end;
`;

export const LeftBtnWrapper = styled.div`
  position: absolute;
  right: 26%;
`;

export const RightBtnWrapper = styled.div`
  position: absolute;
  right: 8%;
`;
