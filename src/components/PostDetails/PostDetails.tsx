import React, { useContext } from 'react';
import { TodosContext } from '../../TodoContext/TodoContext';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentedForm/NewCommentForm';
import { Comment } from '../../types/Comment';

export const PostDetails: React.FC = () => {
  const {
    choosenPost,
    postComments,
    setPostComments,
    setAvailNewComment,
    availNewComment,
  } = useContext(TodosContext);

  if (!choosenPost) {
    return null;
  }

  console.log(postComments)

  const handleDeleteComment = (com: Comment) => {
    const filterComments = postComments.filter(item => item.id !== com.id);
  
    setPostComments(filterComments);
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${choosenPost.id}: ${choosenPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {choosenPost.body}
          </p>
        </div>

        <div className="block">
          <Loader />

          {/* <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div> */}

          {postComments
            ? <> 
                <p className="title is-4">Comments:</p>
                {postComments.map((comment: Comment) => {
                  <article key={comment.id} className="message is-small" data-cy="Comment">
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>

                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(comment)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                })}
                
            </>
            
            : <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
          }
          

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setAvailNewComment(!availNewComment)}
          >
            Write a comment
          </button>
        </div>


        <NewCommentForm />
      </div>
    </div>
  )
};
