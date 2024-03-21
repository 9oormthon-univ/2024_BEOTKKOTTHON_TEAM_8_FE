import styled from 'styled-components';

export const Bubble = styled.div<{ topSize: number; isFadeOut?: boolean }>`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  top: ${(props) => `${props.topSize}rem`};

  width: 19.2rem;
  height: 2.3rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 1rem;

  text-align: center;

  &::after {
    content: '';
    position: absolute;
    top: 2.3rem;
    left: 46%;

    border-top: 10px solid rgba(0, 0, 0, 0.1);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  animation: ${(props) =>
    !props.isFadeOut ? 'fadeIn 1s ease-out' : 'fadeOut 1s ease-out forwards'};
`;
