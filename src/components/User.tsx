import React from 'react';

type Props = {
  user: UserType;
};

export const User: React.FC<Props> = ({ user }) => (
  <div className="author">
    <div className="author__info">
      <p className="author__name">{user.name}</p>
      <p>
        <a href={`mailto:${user.email}`} className="author__email">
          {user.email}
        </a>
      </p>
    </div>

    <div className="author_address">
      <p>
        <b>Street:</b>
        {' '}
        <i>{user.address.street}</i>
      </p>
      <p>
        <b>Suite:</b>
        {' '}
        <i>{user.address.suite}</i>
      </p>
      <p>
        <b>City:</b>
        {' '}
        <i>{user.address.city}</i>
      </p>
      <p>
        <b>Zipcode:</b>
        {' '}
        <i>{user.address.zipcode}</i>
      </p>
    </div>
  </div>
);
