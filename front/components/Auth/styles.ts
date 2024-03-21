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

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 5rem;
`;

export const Title = styled.div`
  font-size: 2.8rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.2rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

export const Input = styled.input`
  font-family: 'ChosunNm';
  font-size: 2.4rem;
  color: rgba(0, 0, 0, 0.5);

  width: 20.8rem;
  border: none;
  background: none;
  outline: none;
  border-bottom: 0.15rem solid rgba(0, 0, 0, 0.2);
  padding-bottom: 0.8rem;
  text-align: center;

  box-shadow: 0 0 0 500px #ededed inset !important;

  &::placeholder {
    font-family: 'ChosunNm';
    font-size: 2.4rem;
    color: rgba(0, 0, 0, 0.2);
    text-align: center;
  }
`;

export const InputValidationText = styled.div`
  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.25);
`;

export const Button = styled.button`
  cursor: pointer;
  width: 10.9rem;
  white-space: nowrap;

  color: rgba(0, 0, 0, 0.5);

  display: inline-block;
  font-family: 'ChosunNm';
  font-size: 1.6rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 1rem;
  padding: 1rem 0;
`;

export const BtnWrapper = styled.div<{ disabled: boolean }>`
  cursor: ${(props) => !props.disabled && 'pointer'};
  position: absolute;
  width: 100%;

  display: flex;
  justify-content: end;

  bottom: -7rem;
  right: 2rem;
`;
