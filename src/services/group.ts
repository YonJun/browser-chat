import { Observable } from "rxjs";
import { getGroups, Group } from "../modules/chat/utils";

export const WatchGroups$ = new Observable<Group[]>(function subscribe(
  subscriber,
) {
  let oldData: null | string = null;

  let intervalId = setInterval(() => {
    const newData = JSON.stringify(getGroups());
    if (oldData !== newData) {
      subscriber.next(JSON.parse(newData));
    }
    if (oldData === null) {
      subscriber.next(JSON.parse(newData));
      oldData = newData;
    }
  }, 1000);

  return function unsubscribe() {
    clearInterval(intervalId);
  };
});
