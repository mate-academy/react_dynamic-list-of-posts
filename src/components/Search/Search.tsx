import React from 'react';
import './Search.css';

interface Props {
  handlerGetData: () => void;
  onChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
  isLoaded: boolean;
  disabled: boolean;
  listLoaded: boolean;
  inputValue: string;
}

export const Search: React.FC<Props> = (props) => {
  const {
    handlerGetData,
    onChangeHandler,
    isLoaded,
    disabled,
    listLoaded,
    inputValue,
  } = props;

  return (
    <div className="buttons-block">
      {
        listLoaded
          ? (
            <>
              <input
                type="text"
                placeholder="filter by...."
                value={inputValue}
                onChange={(event) => onChangeHandler(event)}
              />
            </>
          )
          : (
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => handlerGetData()}
              disabled={disabled}
            >
              {isLoaded ? 'Loading...' : 'Load'}
            </button>
          )
      }
    </div>
  );
};
