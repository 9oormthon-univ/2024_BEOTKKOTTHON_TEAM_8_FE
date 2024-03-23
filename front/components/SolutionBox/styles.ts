import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: calc(82px + 1.5rem);
  background-size: cover;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2rem;
`;

export const SolutionAreaImg = styled.img`
  margin-top: 1.5rem;
`;

export const Input = styled.textarea`
  font-family: 'NanumPen';
  font-size: 2.4rem;
  color: rgba(0, 0, 0, 0.5);
  background: transparent;
  text-overflow: ellipsis;
  line-height: 1.4;

  position: absolute;
  top: 10px;
  left: 0;
  right: 0;

  width: 230px;
  height: 197px;

  border: none;
  outline: none;
  padding: 0.6rem 1.2rem;
  box-sizing: border-box;
  resize: none;
  overflow: hidden;
  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
`;
