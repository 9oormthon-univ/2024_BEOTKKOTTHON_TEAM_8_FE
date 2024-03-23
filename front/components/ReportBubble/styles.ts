import styled from 'styled-components';

export const Bubble = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 1;
  position: relative;
  top: -4%;
  left: 10%;
  width: 19.8rem;

  text-align: center;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 1rem;

  /** text */
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 12px;

  color: rgba(0, 0, 0, 0.5);

  padding: 0.8rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 35%;
    left: -20px;

    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 20px 8px 0;
    border-color: transparent rgba(0, 0, 0, 0.15) transparent transparent;

    transform: translateY(50%);
  }
`;
