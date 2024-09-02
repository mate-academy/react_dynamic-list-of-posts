import React from 'react';
type Props = {
  children: React.ReactNode;
};
export const DropDownMenu: React.FC<Props> = ({ children }) => {
  return (
    <div className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content">{children}</div>
    </div>
  );
};
