import styled from 'styled-components';

export const BubbleTotal = styled.div<{ leftSize: number }>`
  display: flex;
  position: absolute;
  left: ${(props) => `${props.leftSize}rem`};
  align-items: flex-start;
`;
export const Bubble = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;

  width: 14.1rem;
  height: max-content;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 8px 6px 5px 9px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 12.12px;
  text-align: left;
  z-index: 100;

  &::after {
    content: '';
    position: absolute;
    left: 10px;
    top: 80%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: rgba(0, 0, 0, 0.1);
    border-left: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-left: -20px;
  }
`;

export const CloseBtn = styled.img`
  margin-left: 0.9rem;
`;
