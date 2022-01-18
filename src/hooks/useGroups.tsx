import { useEffect, useState } from "react";
import type { Group } from "../modules/chat/utils";
import { WatchGroups$ } from "../services/group";
import { userStore } from "./../global-stores/userStore";

export const useGroups = () => {
  const myId = userStore((s) => s.id);
  const [data, set_data] = useState<Group[]>([]);
  useEffect(() => {
    const subscription = WatchGroups$.subscribe((nextGroups) => {
      set_data(nextGroups);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { data };
};
