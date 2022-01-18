import { useEffect, useState } from "react";
import type { Contact } from "../modules/chat/utils";
import { WatchMyContacts$ } from "../services/users";
import { userStore } from "./../global-stores/userStore";

export const useContacts = () => {
  const myId = userStore((s) => s.id);
  const [data, set_data] = useState<Contact[]>([]);
  useEffect(() => {
    const subscription = WatchMyContacts$(myId).subscribe((nextContacts) => {
      set_data(nextContacts);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { data };
};
