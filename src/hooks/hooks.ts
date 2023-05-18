import { useState } from 'react';

export default function useInput(initialValue: string, callback: () => void) {
  const [value, setValue] = useState(initialValue);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(event.target.value);
    callback();
  };

  const reset = () => {
    setValue('');
  };

  return {
    value,
    onChange,
    reset,
  };
}
