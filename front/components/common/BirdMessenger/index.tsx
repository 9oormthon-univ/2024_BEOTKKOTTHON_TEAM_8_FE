import { useRecoilValue } from 'recoil';
import { nameState } from '@/recoil/states';
import BirdSVG from '../../../public/assets/icons/bird.svg';
import * as S from './styles';

const BirdMessenger = ({ isPast }: { isPast: boolean }) => {
  const name = useRecoilValue(nameState);

  return (
    <S.Container>
      <S.ImageWrapper>
        <BirdSVG />
      </S.ImageWrapper>
      <S.Bubble>
        <S.Message isPast={isPast}>
          {isPast ? (
            '도착한 편지가 없어'
          ) : (
            <>
              미래의 {name}에게 <br />
              따뜻한 마음을 담은 <br />
              편지를 보내줘
            </>
          )}
        </S.Message>
        <S.SubMessage>{isPast && '편지가 도착하면 알려줄게'}</S.SubMessage>
      </S.Bubble>
    </S.Container>
  );
};

export default BirdMessenger;
