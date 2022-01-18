import { CUSTOM_GROUPS } from "../../constants/groups";
import { ONLINE_USERS } from "../../constants/user";
import type { Message } from "../../custom-types/message";
import type { User } from "../../custom-types/user";

export const getOnlineUsersStorage = () =>
  JSON.parse(localStorage.getItem(ONLINE_USERS) || "[]") as User[];

export const setOnlineUser = (users: User[]) =>
  localStorage.setItem(ONLINE_USERS, JSON.stringify(users));

export function connectUser(u: User) {
  const onlineUsers = getOnlineUsersStorage();
  onlineUsers.push(u);
  setOnlineUser(onlineUsers);
}
export function disconnectUser(id: string) {
  const newListCurrentUsers = getOnlineUsersStorage().filter(
    (u) => u.id !== id,
  );

  localStorage.setItem(ONLINE_USERS, JSON.stringify(newListCurrentUsers));
}

export function updateUser(user: User) {
  const newListCurrentUsers = getOnlineUsersStorage().map((u) => {
    if (u.id === user.id) {
      return user;
    }
    return u;
  });
  localStorage.setItem(ONLINE_USERS, JSON.stringify(newListCurrentUsers));
}

/**
 * @param {string} KEY_ID Join sender and receiver ID ejm: senderId_receiverId or receiverId_senderId,it depends on who created the chat
 */
export function getMessages(KEY_ID: string) {
  return JSON.parse(
    localStorage.getItem(`${KEY_ID}_messages`) || "[]",
  ) as Message[];
}

/**
 * @param {string} KEY_ID Join sender and receiver ID ejm: senderId_receiverId or receiverId_senderId,it depends on who created the chat
 */
export function setMessage(KEY_ID: string, messages: Message[]) {
  localStorage.setItem(`${KEY_ID}_messages`, JSON.stringify(messages));
}

export function getUserInfoById(id: string) {
  const listOnlineUsers = getOnlineUsersStorage();
  return listOnlineUsers.find((u) => u.id === id);
}

interface AddMessageProps {
  /**
   * Join sender and receiver ID ejm: senderId_receiverId or receiverId_senderId,it depends on who created the chat
   */
  KEY_ID: string;
  newMessage: Message;
}
export function addMessage({ KEY_ID, newMessage }: AddMessageProps) {
  const messages = getMessages(KEY_ID);
  messages.push(newMessage);
  setMessage(KEY_ID, messages);
}

export function hideMessage(KEY_ID: string, messageId: string) {
  const messages = getMessages(KEY_ID);
  messages.map((m) => {
    if (m.id === messageId) {
      m.isHidden = true;
    }
    return m;
  });

  setMessage(KEY_ID, messages);
}

export type Contact = {
  name: string;
  id: string;
  type: "u" | "c";
};
export function getContacts(myid: string) {
  return JSON.parse(
    localStorage.getItem(`${myid}_contacts`) || "[]",
  ) as Contact[];
}
export function setContacts(myid: string, contacts: Contact[]) {
  localStorage.setItem(`${myid}_contacts`, JSON.stringify(contacts));
}

export function findContact(myid: string, idContact: string) {
  const contacts = getContacts(myid);
  return contacts.find((c) => c.id === idContact);
}

export function addUserContact(myid: string, idContact: string) {
  if (!findContact(myid, idContact)) {
    const newContacts = getContacts(myid);
    const user = getUserInfoById(idContact)!;

    newContacts.push({ name: user.nickname, id: user.id, type: "u" });
    setContacts(myid, newContacts);
  }
}
export function addGroupContact(myId: string, groupId: string) {
  if (!findContact(myId, groupId)) {
    const newContacts = getContacts(myId);
    const group = findGroup(groupId)!;

    newContacts.push({ name: group.name, id: group.id, type: "c" });
    setContacts(myId, newContacts);
  }
}

export type Group = Omit<Contact, "type">;

export const getDefaultGroups = () => [
  {
    id: "general",
    name: "General",
  },
  {
    id: "sport",
    name: "Deporte",
  },
  {
    id: "politics",
    name: "Política",
  },
];

export const getGroups = () =>
  JSON.parse(localStorage.getItem(CUSTOM_GROUPS) || "[]") as Group[];

export const setGroups = (g: Group[]) =>
  localStorage.setItem(CUSTOM_GROUPS, JSON.stringify(g));

export function findGroup(ID: string) {
  const g = getGroups().concat(getDefaultGroups());
  return g.find((g) => g.id === ID);
}

export function addGroup(group: Group) {
  if (!findGroup(group.id)) {
    const g = getGroups();

    g.push(group);
    setGroups(g);
  }
}
