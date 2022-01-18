import { Observable } from "rxjs";
import {
  Contact,
  getContacts,
  getOnlineUsersStorage,
} from "../modules/chat/utils";
import type { User } from "../custom-types/user";

export const WatchOnlineUsers$ = new Observable<User[]>(function subscribe(
  subscriber,
) {
  let oldUsers: null | string = null;

  let intervalId = setInterval(() => {
    const users = JSON.stringify(getOnlineUsersStorage());
    if (oldUsers !== users) {
      subscriber.next(JSON.parse(users));
    }
    if (oldUsers === null) {
      subscriber.next(JSON.parse(users));
      oldUsers = users;
    }
  }, 1000);

  return function unsubscribe() {
    clearInterval(intervalId);
  };
});

export const WatchMyContacts$ = (myId: string) => {
  return new Observable<Contact[]>(function subscribe(subscriber) {
    let oldContacts: null | string = null;

    let intervalId = setInterval(() => {
      const contacts = JSON.stringify(getContacts(myId));
      if (oldContacts !== contacts) {
        subscriber.next(JSON.parse(contacts));
      }
      if (oldContacts === null) {
        subscriber.next(JSON.parse(contacts));
        oldContacts = contacts;
      }
    }, 1000);

    return function unsubscribe() {
      clearInterval(intervalId);
    };
  });
};
