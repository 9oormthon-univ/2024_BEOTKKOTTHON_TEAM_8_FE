import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from{
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from{
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const FirstTxt = styled.div`
  color: #000;
  font-size: 4rem;
  margin-top: 14.2rem;
  margin-left: 2.7rem;
  opacity: 0;
  animation:
    ${fadeIn} 2s ease-out forwards,
    ${fadeOut} 1s ease-out 3s forwards;
`;
export const FirstSubTxt = styled.div`
  margin-left: 2.7rem;
  color: #7a7a7a;
  font-size: 2rem;
  white-space: pre-wrap;
  margin-top: 1rem;
  opacity: 0;
  animation:
    ${fadeIn} 2s ease-out 1s forwards,
    ${fadeOut} 1s ease-out 3s forwards;
`;
export const SecondTxt = styled.div`
  color: #000;
  opacity: 70%;
  font-size: 4rem;
  text-align: center;
  margin-left: 0rem;
  opacity: 0;
  animation:
    ${fadeIn} 2s ease-out 3s forwards,
    ${fadeOut} 1s ease-out 6s forwards;
`;
export const SecondSubTxt = styled.div`
  color: #7a7a7a;
  font-size: 2rem;
  text-align: center;
  opacity: 0;
  margin-top: 1rem;
  animation:${fadeIn} 1s ease-out 4s forwards, ${fadeOut} 1s ease-out 6s forwards;
`;
export const ThirdTxt = styled.div`
  color: #000;
  opacity: 70%;
  font-size: 4rem;
  text-align: right;
  margin-right: 2.7rem;
  opacity: 0;
  animation: ${fadeIn} 2s ease-out 6s forwards, ${fadeOut} 1s ease-out 9s forwards;
`;
export const ThirdSubTxt = styled.div`
  color: #7a7a7a;
  font-size: 2rem;
  text-align: right;
  margin-right: 2.7rem;
  margin-top: 1rem;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 7s forwards, ${fadeOut} 1s ease-out 9s forwards;
`;
