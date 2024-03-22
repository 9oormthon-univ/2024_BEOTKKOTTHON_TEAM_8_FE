import styled, { keyframes } from 'styled-components';
const breakpoints = [480, 768, 992, 1280];
const media = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

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
export const First = styled.div`
  position: absolute;
  top: 14.2rem;
  text-align: left;
  width: 100%;
  padding-left: 2.7rem;
`;
export const Second = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;
export const Third = styled.div`
  position: absolute;
  bottom: 18.7rem;
  padding-right: 2.7rem;
  text-align: right;
  width: 100%;
`;
export const FirstTxt = styled.div`
  color: rgba(0, 0, 0, 0.5);
  opacity: 70%;
  font-size: 4rem;
  opacity: 0;
  animation:
    ${fadeIn} 2s ease-out forwards,
    ${fadeOut} 1s ease-out 3s forwards;
`;
export const FirstSubTxt = styled.div`
  color: rgba(0, 0, 0, 0.25);
  font-size: 2rem;
  white-space: pre-wrap;
  margin-top: 1rem;
  opacity: 0;
  animation:
    ${fadeIn} 2s ease-out 1s forwards,
    ${fadeOut} 1s ease-out 3s forwards;
`;
export const SecondTxt = styled(FirstTxt)`
  animation:
    ${fadeIn} 2s ease-out 3s forwards,
    ${fadeOut} 1s ease-out 6s forwards;
`;
export const SecondSubTxt = styled(FirstSubTxt)`
  animation:
    ${fadeIn} 1s ease-out 4s forwards,
    ${fadeOut} 1s ease-out 6s forwards;
`;
export const ThirdTxt = styled(SecondTxt)`
  animation:
    ${fadeIn} 2s ease-out 6s forwards,
    ${fadeOut} 1s ease-out 9s forwards;
`;
export const ThirdSubTxt = styled(SecondSubTxt)`
  animation:
    ${fadeIn} 1s ease-out 7s forwards,
    ${fadeOut} 1s ease-out 9s forwards;
`;
