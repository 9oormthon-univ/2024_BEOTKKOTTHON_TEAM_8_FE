import styled from 'styled-components';

export const BubbleContainer = styled.div<{ topSize: number }>`
  position: relative;
  width: 100%;
  display: flex;
  top: ${(props) => `${props.topSize}rem`};
  justify-content: center;
  align-items: center;
`;

export const Bubble = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17rem;
  height: 2.3rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  text-align: center;
  &::after {
    content: '';
    position: absolute;
    top: 2.3rem;
    left: 46%;
    border-top: 10px solid rgba(0, 0, 0, 0.1);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
  }
`;

export const Close = styled.img`
  position: absolute;
  left: calc(100% - 12.5rem);
`;
