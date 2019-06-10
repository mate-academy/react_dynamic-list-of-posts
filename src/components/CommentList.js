import React from 'react';
import Commentar from './Comment';

export default function CommentList(props) {
    return (
      <div className="comments">
        {props.commetItem.map(commetItem =>
          <Commentar commetItem={commetItem} key={commetItem.name} />)
        }
      </div>
    );
}
