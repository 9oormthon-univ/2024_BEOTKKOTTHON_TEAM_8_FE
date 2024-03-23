import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Bubble = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 1;
  position: relative;
  top: -4%;
  left: 10%;
  width: 19rem;
  height: 9.2rem;

  text-align: center;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 100%;

  &::after {
    content: '';
    position: absolute;
    bottom: -7%;
    right: 90%;

    width: 40px;
    height: 36px;

    background: #ededed;
    border-bottom-right-radius: 40px 50px;

    transform: rotate(29deg);
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -4%;
    left: -4%;

    height: 26px;

    border-right: 50px solid rgba(0, 0, 0, 0.15);
    background: #ededed;
    border-bottom-right-radius: 84px 50px;

    transform: rotate(22deg);
  }
`;

export const ImageWrapper = styled.div`
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 15%;
`;

export const Message = styled.h1<{ isPast?: boolean }>`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  white-space: nowrap;

  color: ${(props) => (!props.isPast ? '#000' : 'rgba(0, 0, 0, 0.5)')};
`;

export const SubMessage = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 12px;
  text-align: center;
  white-space: nowrap;

  color: rgba(0, 0, 0, 0.5);
`;
