export const apiHelper = (
  getData: (postId: number) => Promise<any>,
  id: number,
  handleLoading: (bool: boolean) => void,
  handleError: (bool: string) => void,
) => {
  handleLoading(true);

  const result = getData(id)
    .then(res => {
      if ('Error' in res) {
        return Promise.reject(res.Error);
      }

      return Promise.resolve(res);
    })
    .catch(handleError)
    .finally(() => handleLoading(false));

  return result;
};
