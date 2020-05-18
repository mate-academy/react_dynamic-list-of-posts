import React from 'react';


export const User = ({ name, email }: User) => (
  <div className="author">
    <div className="author_name">
      <p>{name}</p>
      <p>
        <a className="author_email" href={`mailto:${email}`}>
          {email}
        </a>
      </p>
    </div>
  </div>
);
