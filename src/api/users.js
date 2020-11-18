
import { request } from './api';

export const USERS_URL = '/users';

export async function fetchData(setState) {
  const response = await request(USERS_URL);
  const preparedUsers = response.data
    .filter(user => user.name);

  setState(preparedUsers);
}
