import React from 'react';
import './Error.scss';

export const Error: React.FC = ({ children }) => {
  return (
    <div className="Error">
      {children}
    </div>
  );
};
