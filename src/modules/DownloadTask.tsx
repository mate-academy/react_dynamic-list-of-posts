import React, { useState, FC } from 'react';

interface Props {
  setButtonText: Function;
  getData: Function;
  buttonText: string;
}

export const DownloadTask: FC<Props> = ({
  setButtonText,
  getData,
  buttonText,
}) => {
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
