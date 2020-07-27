import React, { useState } from 'react';

interface DownloadTaskProps {
  setButtonText: Function;
  getData: Function;
  buttonText: string;
}

export const DownloadTask = ({
  setButtonText,
  getData,
  buttonText,
}: DownloadTaskProps) => {
  const [buttonDisable, setButtonDisable] = useState(false);

  return (
    <button
      type="button"
      disabled={buttonDisable}
      onClick={
        () => {
          setButtonDisable(true);
          setButtonText('Loading');
          getData();
        }
      }
    >
      {buttonText}
    </button>
  );
};
