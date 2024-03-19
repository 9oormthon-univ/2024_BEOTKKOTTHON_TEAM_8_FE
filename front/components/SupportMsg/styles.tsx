import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const SupportMent = styled.div`
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 1.5rem;
  margin-left: 2.5rem;
`;
export const Writer = styled(SupportMent)`
  font-size: 1.6rem;
  margin-top: 1rem;
`;
