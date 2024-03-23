import styled from 'styled-components';
const breakpoints = [480, 768, 992, 1280];
const media = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const FullImg = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
export const ReportImg = styled.img`
  margin-right: 1.2rem;
  margin-bottom: 1.5rem;
  @media (max-height: 736px) {
    margin-bottom: 0;
  }
`;
export const SubTitle = styled.div`
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5);
  /* margin-top: 6rem; */
  margin-bottom: 1rem;
  text-align: center;
`;
export const Time = styled.div`
  font-size: 3rem;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
`;
export const ImgTotal = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MainImg = styled.img`
  position: absolute;
  width: 100%;
  bottom: 0;
  @media (max-height: 736px) {
    position: fixed;
    bottom: -11rem;
  }
  ${media[1]} {
    width: 391px;
    position: fixed;
    bottom: -8rem;
  }
`;
export const TotalBottom = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  bottom: 10rem;
  @media (max-height: 736px) {
    bottom: 6.17vh;
  }
  ${media[1]} {
    bottom: 7.17vh;
  }
`;

export const BottomMenues = styled.div`
  gap: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5.6rem;
  ${media[1]} {
    margin-bottom: 3.6rem;
  }
  @media (max-height: 736px) {
    margin-bottom: 1.6rem;
  }
`;
export const Menu = styled.div`
  cursor: pointer;
  position: relative;
  width: 10.9rem;
  height: 3.7rem;
  font-size: 1.6rem;
  background-color: #d9d9d9;
  border-radius: 10px;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const WorryCount = styled.div`
  position: absolute;
  width: 21.84px;
  height: 21.84px;
  border-radius: 50%;
  background: #869daa;
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  color: #fff;
  right: -0.6rem;
  top: -0.7rem;
`;
export const LifeQuotes = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
  width: 100%;
  @media (max-height: 736px) {
    bottom: 3rem;
  }
`;
export const Author = styled.div`
  margin-top: 10px;
`;
export const BubbleContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  top: 6rem;
  @media (max-height: 736px) {
    top: 2rem;
  }
`;
