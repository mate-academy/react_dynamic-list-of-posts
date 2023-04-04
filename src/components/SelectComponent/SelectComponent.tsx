import { FC } from 'react';

interface Props {
  onOpen: () => void,
  currentUserName: string,
}

export const SelectComponent: FC<Props> = (props) => {
  const { onOpen, currentUserName } = props;

  return (
    <div className="dropdown-trigger">
      <button
        type="button"
        className="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        onClick={onOpen}
      >
        <span>
          {currentUserName}
        </span>

        <span className="icon is-small">
          <i className="fas fa-angle-down" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
};
