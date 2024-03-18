import { atom } from 'recoil';

export const userIdState = atom({
  key: 'userIdState',
  default: '',
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
