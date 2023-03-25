import { useState } from 'react';

export function useAction(action: boolean) {
  const [currAction, setCurrAction] = useState(action);

  const changeAction = (newAction: boolean) => setCurrAction(newAction);

  return { currAction, changeAction };
}

export function useValues<T>(value: T) {
  const [currValue, setCurrValue] = useState<T>(value);

  const changeValue = (newValue: T) => setCurrValue(newValue);

  return { currValue, changeValue };
}
