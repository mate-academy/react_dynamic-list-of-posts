export const validation = (
  postName: string,
  postEmail: string,
  postBody: string,
) => {
  const emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$';

  if (!postName
    || !postEmail || !postEmail.match(emailPattern) || !postBody) {
    return false;
  }

  return true;
};
