export async function dataDownload<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => response.json());
}
