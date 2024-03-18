import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  position: relative;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 2.8rem;
`;

export const SubTitle = styled.h2`
  font-size: 1.6rem;
`;

export const TimePickerWrapper = styled.div``;

export const BtnContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: end;
  gap: 1.3rem;
  padding-right: 4rem;
`;
