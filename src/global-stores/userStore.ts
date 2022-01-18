import create from "zustand";
import { uid } from "uid";
import type { User } from "./../custom-types/user";
import { updateUser } from "../modules/chat/utils";

interface UserState extends User {
  setNickname: (n: string) => void;
}

const newId = uid(3);
export const userStore = create<UserState>((set, get) => ({
  id: newId,
  nickname: newId,
  setNickname: (n: string) => {
    set({ nickname: n });
    updateUser({ id: get().id, nickname: n });
  },
}));
