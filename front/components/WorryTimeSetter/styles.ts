import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7.5rem;
`;

export const Box = styled.div`
  position: relative;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const Title = styled.h1`
  font-weight: 400;
  font-size: 2.8rem;
  line-height: 28px;
  text-align: center;

  color: rgba(0, 0, 0, 0.5);
`;

export const SubTitle = styled.h2`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 16px;
  text-align: center;

  color: rgba(0, 0, 0, 0.5);
`;

export const BtnContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: end;
  gap: 1.3rem;
  padding-right: 6.4rem;
`;
