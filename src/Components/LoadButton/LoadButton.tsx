import React, { FC } from 'react';

interface Props {
  onLoad: () => void;
  title: string;
}

export const Button: FC<Props> = (props) => {
  return (
    <button
      className="btn btn-primary btn-lg"
      onClick={props.onLoad}
      type="button"
    >
      {props.title}
    </button>
  );
};
