import React, { FC } from 'react';

interface Props {
  user: User;
}

export const User: FC<Props> = ({ user }) => {
  const { name, email, address } = user;
  const { city } = address;

  return (
    <div className="user">
      <span className="user__span">
        {`Written by: ${name} ${email} from: ${city}`}
      </span>
    </div>
  );
};
