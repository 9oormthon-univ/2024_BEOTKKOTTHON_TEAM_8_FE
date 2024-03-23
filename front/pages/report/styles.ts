import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2.8rem;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReportTxt = styled.div`
  font-size: 3.2rem;
  font-weight: 400;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
`;

export const Date = styled.div`
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 12px;
  text-align: center;

  color: rgba(0, 0, 0, 0.5);
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1.6rem;
`;

export const ReportTxtBox = styled.div`
  width: 100%;
  height: 12rem;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  padding: 0 4rem;
`;

export const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.6rem;
`;

export const ResultTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 0.8rem;

  font-weight: 400;
  font-size: 1.8rem;
  line-height: 20px;

  color: rgba(0, 0, 0, 0.46);
`;

export const AdviceBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.9rem;
`;

export const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 1.2rem;
`;

export const Goback = styled.div`
  cursor: pointer;

  width: 109px;
  height: 36px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.6rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const LodingContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
