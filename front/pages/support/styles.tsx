import styled from 'styled-components';
const breakpoints = [480, 768, 992, 1280];
const media = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const BottomInput = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 1.8rem;
  gap: 3rem;
  position: fixed;
  bottom: 4.9rem;
`;
export const Img = styled.img``;
export const InputForm = styled.div`
  width: 100%;
  border-bottom: 1.5px solid #d9d9d9;
  ${media[2]} {
    width: calc(391px - 88px - 6rem - 3.6rem);
  }
`;
export const Input = styled.input`
  outline: none;
  background: none;
  border: none;
  width: 100%;
  height: 37px;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
    font-size: 2.4rem;
    text-align: center;
  }
`;
export const SenBtn = styled.div`
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  height: 37px;
  min-width: 58px;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
