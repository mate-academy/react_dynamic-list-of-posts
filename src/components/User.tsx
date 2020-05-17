import React from 'react';

type Props = {
  user: User;
};

export const User: React.FC<Props> = ({ user }) => {
  const {
    name,
    email,
    address,
  } = user;

  return (
    <div className="personalInfo">
      <h3 className="personalInfo__name">
        {name}
      </h3>
      <p className="personalInfo__email">
        <a href={`mailto=${email}`}>
          {email}
        </a>
      </p>
      <address className="personalInfo__address">
        <span>
          {address.street}
          {address.suite}
        </span>
        <span>{address.city}</span>
        <span>{address.zipcode}</span>
      </address>
    </div>
  );
};
