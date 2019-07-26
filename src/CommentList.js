import React from 'react'

function CommentList({ comments }) {
    return (
       comments.map(comment => {
        return(
            <div className="comment" key={comment.id}>
               <strong className="comment_name" >{comment.name}</strong>
               <p className="comment_body">
               {comment.body}
               </p>
               <span className="comment_email">{comment.email}</span>
           </div>
        ) 
       })

    )
}

export default CommentList;