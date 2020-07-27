export async function fetchData(urlUnit: string): Promise<any> {
  const URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';
  const data = await fetch(`${URL}${urlUnit}`);

  const response = await data.json();

  return response;
}
