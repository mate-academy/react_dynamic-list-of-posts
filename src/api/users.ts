import { BASE_URL } from './api';

type UserBody = unknown & User;

const serializeUser = (obj: UserBody): User => ({
  id: obj.id,
  name: obj.name,
});

export const getUsers = async (): Promise<User[]> => {
  const body: UserBody[] = await fetch(`${BASE_URL}/users`)
    .then(res => res.json());

  return body.map(serializeUser);
};
