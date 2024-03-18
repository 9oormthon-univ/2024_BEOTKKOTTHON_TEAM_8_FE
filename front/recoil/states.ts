import { atom } from 'recoil';

export const userIdState = atom<number>({
  key: 'userIdState',
  default: 0,
});

export const currentWorryTimeState = atom<string[]>({
  key: 'currentWorryTimeState',
  default: [],
});

export const nameState = atom<string>({
  key: 'nameState',
  default: '',
});

export const passwordState = atom<string>({
  key: 'passwordState',
  default: '',
});
