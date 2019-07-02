import React from 'react'

function Comment({ comments }) {
    return (
       comments.map(comment => {
        return(
            <div className="comment" key={comment.id}>
               <strong className="comment_name" >{comment.name}</strong>
               <p className="comment_body">
               {comment.body}
               </p>
               <mark className="comment_email">{comment.email}</mark>
           </div>
        ) 
       })

    )
}

export default Comment;