import styled from 'styled-components';

export const List = styled.ul`
  position: relative;

  width: 100%;
  height: 150px;
  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ListCenter = styled.div`
  box-sizing: border-box;
  height: 50px;
`;

export const ListItem = styled.li<{ isSelected: boolean }>`
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  line-height: 36px;
  text-align: center;
  font-weight: 400;
  font-size: ${({ isSelected }) => (isSelected ? '3.6rem' : '2rem')};
  text-align: center;
`;
