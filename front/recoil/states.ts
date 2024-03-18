import { atom } from 'recoil';

export const userId = atom({
  key: 'userId',
  default: '',
});

export const currentWorryTimeState = atom<string[]>({
  key: 'currentWorryTimeState',
  default: [],
});
