import { BASE_URL } from './api';

export async function getData() {
  const response = await Promise.all([
    fetch('https://mate.academy/students-api/users/'),
    fetch(`${BASE_URL}`),
  ]);

  if (!response[0].ok || !response[1].ok) {
    throw new Error('Error ocured while fetching the data');
  }

  const users = await response[0].json();
  const posts = await response[1].json();

  return [users, posts];
}
