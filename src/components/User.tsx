import React, { FC } from 'react';

export const User: FC<User> = ({ name, email, address }) => {
  return (
    <section className="user post__user">
      <p className="user__name">{name}</p>
      <a href={`mailto:${email}`} className="user__email">
        {email}
      </a>
      <address className="user__address">
        <div>{`${address.street}, ${address.suite}`}</div>
        <div>{address.city}</div>
      </address>
    </section>
  );
};
