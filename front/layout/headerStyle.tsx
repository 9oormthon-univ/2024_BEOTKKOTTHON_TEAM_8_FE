import styled from 'styled-components';

export const TotalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5.7rem;
  padding: 0 4rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: max-content;
  font-size: 1.2rem;
`;
export const Line = styled.div`
  width: 37px;
  height: 3px;
  background-color: #000;
  opacity: 50%;
  margin-bottom: 0.6rem;
  justify-content: center;
`;
export const HeaderName = styled.div`
  position: relative;
  font-size: 1.2rem;
  color: #000;
  opacity: 50%;
  white-space: nowrap;
`;
export const Circle = styled.img`
  position: absolute;
  top: 6.1rem;
  z-index: 1;
`;
