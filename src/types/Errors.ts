export const ServiceErrors = {
  Unknown: 'Something whent wrong',
} as const;

export type ServiceErrorsValues =
  (typeof ServiceErrors)[keyof typeof ServiceErrors];
