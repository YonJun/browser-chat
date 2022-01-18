import type { RouteObject } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { MainLayout } from "./../modules/layouts/MainLayout";
import { E404 } from "../pages/E404";
import { UserChat } from "./../modules/chat/UserChat";
import { GroupChat } from "../modules/chat/GroupChat";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/u",
        children: [{ path: "/u/:idUser", element: <UserChat /> }],
      },
      {
        path: "/c",
        children: [{ path: "/c/:idGroup", element: <GroupChat /> }],
      },
      { path: "*", element: <E404 /> },
    ],
  },
];
export default routes;
