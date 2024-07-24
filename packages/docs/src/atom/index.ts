import { User } from "~/services/login";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const chainIdAtom = atom("");

const localUser = localStorage.getItem("user");

export const userLocalAtom = atomWithStorage<User>("user", localUser ? JSON.parse(localUser) : {});

export const userAtom = atom<User>((get) => {
  const userLocal = get(userLocalAtom);
  return userLocal;
});

export const tokenAtom = atom((get) => {
  const user = get(userAtom);
  return user.token;
});

export const balanceAtom = atom(0);
export const transInVisibleAtom = atom(false);
export const transOutVisibleAtom = atom(false);
