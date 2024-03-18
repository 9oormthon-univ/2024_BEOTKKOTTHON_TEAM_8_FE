import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 31.3rem;
  padding: 0 2rem;

  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 50%,
    transparent 100%
  );

  &::after {
    position: absolute;
    content: '';
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    width: 100%;
    height: 4.1rem;

    background: rgba(0, 0, 0, 0.1);
    border-radius: 0.8rem;
    pointer-events: none;
    z-index: -1;
  }
`;

export const List = styled.ul`
  width: 100%;

  padding: 50% 0;
  margin: 0;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Item = styled.li`
  font-size: 3.6rem;
  text-align: center;

  margin-right: 10px;
  list-style-type: none;
  width: 100%;
  scroll-snap-align: center;
`;
