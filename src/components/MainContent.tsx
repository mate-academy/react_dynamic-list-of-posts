import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  children: React.ReactNode;
};

export const MainContent: React.FC<Props> = ({ children }) => {
  return (
    <div className="tile is-parent">
      <div className="tile is-child box is-success">{children}</div>
    </div>
  );
};

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};
