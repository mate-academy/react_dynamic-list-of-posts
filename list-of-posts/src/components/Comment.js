import React from 'react'

export default function Comment(props) {
    return <p key={props.id}>Comments: {props.comments.body}</p>;
}
