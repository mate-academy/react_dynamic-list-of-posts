export const validateEmail = (userEmail: string): boolean => {
  const emailRegex = new RegExp(
    // eslint-disable-next-line
    '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  );

  return emailRegex.test(userEmail.toLowerCase());
};
