import styled from 'styled-components';
const breakpoints = [480, 768, 992, 1280];
const media = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const SubTitle = styled.div`
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 6rem;
  margin-bottom: 1rem;
  text-align: center;
`;
export const Time = styled.div`
  font-size: 3rem;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
`;
export const MainImg = styled.img`
  position: absolute;
  width: 100%;
  bottom: 0;
  ${media[2]} {
    width: 391px;
  }
`;
export const BottomMenues = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 11px;
  position: absolute;
  bottom: 23.17vh;
  width: 100%;
`;
export const Menu = styled.div`
  width: 10.9rem;
  height: 37px;
  font-size: 1.6rem;
  background-color: #d9d9d9;
  border-radius: 10px;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LifeQuotes = styled.div`
  position: absolute;
  bottom: 13.6vh;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
  width: 100%;
`;
export const Author = styled.div`
  margin-top: 10px;
`;
