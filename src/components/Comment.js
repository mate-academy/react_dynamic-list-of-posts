import React from 'react';


function Comment(props) {
    return (
        <div key={props.name} className="comment">
            <h4>{props.name}</h4>
            <p>{props.body}</p>
            <a href={"mailto:" + props.email}>{props.email}</a>
        </div>
    );
}

export default Comment;