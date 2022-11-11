import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};
export const PostsError: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div
      {...props}
    >
      {children}
    </div>
  );
};
