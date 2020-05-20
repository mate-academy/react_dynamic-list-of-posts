import React from 'react';

type Props = {
  name: string;
  body: string;
  email: string;
};

export const Commentary: React.FC <Props> = ({ name, body, email }) => (
  <div className="comment">
    <p>
      {`Title: ${name}`}
    </p>
    <p>
      {body}
    </p>
    <p>
      {`E-mail: ${email}`}
    </p>
  </div>
);
