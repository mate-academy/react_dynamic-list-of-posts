import React from 'react';

export default function Commentar(props) {
    return (
      <div>
        <cite>{props.commetItem.name}</cite>
        <blockquote>{props.commetItem.body}</blockquote>
      </div>
    );
}
