import { useEffect, useState } from "react";
import { WatchOnlineUsers$ } from "../services/users";
import type { User } from "./../custom-types/user";
import { userStore } from "./../global-stores/userStore";

export const useOnlineUsers = () => {
  const myId = userStore((s) => s.id);
  const [users, set_users] = useState<User[]>([]);
  useEffect(() => {
    const subscription = WatchOnlineUsers$.subscribe((nextUsers) => {
      const nextUsersWithOutMe = nextUsers.filter((u) => u.id !== myId);
      set_users(nextUsersWithOutMe);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { users };
};
