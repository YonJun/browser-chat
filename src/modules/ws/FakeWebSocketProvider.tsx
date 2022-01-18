import React, { useEffect } from "react";
import { connectUser, disconnectUser } from "../chat/utils";
import { userStore } from "./../../global-stores/userStore";

const FakeWebsocketProvider: React.FC<{}> = ({ children }) => {
  const user = userStore((s) => s);

  useEffect(() => {
    connectUser(user);

    const onBeforeunload = () => {
      disconnectUser(user.id);
    };
    window.addEventListener("beforeunload", onBeforeunload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeunload);
    };
  }, []);

  return <>{children}</>;
};
export { FakeWebsocketProvider };
