import classNames from 'classnames';
import { useContext } from 'react';
import { StateContext } from '../../store';

type Props = {
  children: React.ReactNode
};

export const Sidebar: React.FC<Props> = ({ children }) => {
  const {
    posts: { selectedPost },
  } = useContext(StateContext);

  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile is-parent is-8-desktop Sidebar',
        { 'Sidebar--open': selectedPost },
      )}
    >
      <div className="tile is-child box is-success">
        {children}
      </div>
    </div>
  );
};
