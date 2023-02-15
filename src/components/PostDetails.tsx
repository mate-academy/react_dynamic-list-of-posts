import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
// import { User } from '../types/User';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post,
  comments: Comment[],
  postComments: Comment[],
  isLoadingComments: boolean,
  setComments: (value: Comment[])=> void,
  setPostComments: (value: Comment[])=> void,
};

export const PostDetails: React.FC<Props> = ({
  post, comments, setComments,
  isLoadingComments,
  postComments, setPostComments,
}) => {
  const [isSeen, setIsSeen] = useState(false);
  const [isError, setIsError] = useState(false);

  const deleteComment = async (comment: Comment) => {
    const response = client.delete(`/comments/${comment.id}`);
    const result = await response;

    if (result === 1) {
      setComments(comments.filter((one: Comment) => one.id !== comment.id));
      setPostComments(postComments.filter(
        (one: Comment) => one.id !== comment.id,
      ));

      return;
    }

    setIsError(true);
  };

  useEffect(() => {
    setIsSeen(false);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #
            {post.id}
            :
            {' '}
            {post.title}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        {isLoadingComments && <Loader />}
        {!isLoadingComments
        && (
          <div className="block">

            {isError && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {postComments.length > 0
               && (
                 <>
                   <p className="title is-4">Comments:</p>
                   {postComments.map((comment: Comment) => {
                     return (
                       <article
                         key={comment.id}
                         className="message is-small"
                         data-cy="Comment"
                       >
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
                             onClick={() => {
                               deleteComment(comment);
                             }}
                           >
                             delete button
                           </button>
                         </div>

                         <div className="message-body" data-cy="CommentBody">
                           {comment.body}
                         </div>
                       </article>
                     );
                   })}
                 </>
               )}

            {postComments.length === 0 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}
            {!isSeen
            && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => {
                  setIsSeen(true);
                }}
              >
                Write a comment
              </button>
            )}
          </div>
        )}
        {
          isSeen && (
            <NewCommentForm
              post={post}
              comments={comments}
              setComments={setComments}
              setPostComments={setPostComments}
              postComments={postComments}
            />
          )
        }
      </div>
    </div>
  );
};
