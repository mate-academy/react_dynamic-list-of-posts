import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

export const Sidebar: React.FC<Props> = ({ isOpen, children }) => {
  return (
    <div
      data-cy="Sidebar"
      className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': isOpen,
      })}
    >
      <div className="tile is-child box is-success">{children}</div>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
