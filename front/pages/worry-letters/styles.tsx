import styled from 'styled-components';

export const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const WorryDate = styled.div`
  margin-top: 13.1rem;
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 1.5rem;
`;
export const BottomBtn = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
export const Button = styled.div<{ isWrite: boolean }>`
  width: 109px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.isWrite ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0,0,0,0.05)'};
  color: ${(props) =>
    props.isWrite ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0,0,0,0.25)'};
  pointer-events: ${(props) => !props.isWrite && 'none'};
  font-size: 1.6rem;
  font-weight: 400;
  text-align: center;
`;
export const FullWidth = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 23.5rem;
`;
export const BirdContainer = styled.div`
  display: flex;
  margin-left: 7.9rem;
`;
export const BirdImg = styled.img`
  margin-top: 3.3rem;
  justify-content: flex-start;
`;
export const PageBtn = styled.div`
  display: flex;
  gap: 11.96px;
  align-items: flex-end;
  float: right;
  margin-right: 8.1rem;
`;
export const MoveBtn = styled.img`
  z-index: 0;
  /* position: absolute; */
`;
export const gif = styled.img``;
export const PassTime = styled.div`
  display: flex;
`;