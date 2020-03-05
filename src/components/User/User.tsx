import React, { FC } from 'react';

interface Props {
  user: User;
}
export const User: FC<Props> = (props) => {
  const { user } = props;
  const { name, email, address } = user;
  const {
    street,
    suite,
    city,
    zipcode,
    geo,
  } = address;
  const { lat, lng } = geo;

  return (
    <div className="card">
      <div className="card-content">
        <p className="title">
          {name}
        </p>
        <p className="subtitle title">
          {email}
        </p>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <span>
            {`${street}, ${suite} ${city}`}
          </span>
        </p>
        <p className="card-footer-item">
          <span>
            {`${zipcode}, ${lat}, ${lng}`}
          </span>
        </p>
      </footer>
    </div>
  );
};
