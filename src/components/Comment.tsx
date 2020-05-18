import React from 'react';

export const Comment = ({ name, email, body }: Comment) => (
  <li className="guest">
    <p className="guest_name">{name}</p>
    <p>{body}</p>
    <p>
      <a className="guest_email" href={`mailto:${email}`}>
        {email}
      </a>
    </p>
  </li>
);
