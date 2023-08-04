import React, { useEffect, useState } from 'react';
import * as postService from '../api/posts';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postError, setPostError] = useState(false);
  const [inputAccess, setInputAccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setInputAccess(false);

    postService.getComments(post.id)
      .then(setComments)
      .catch(() => setPostError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, [post]);

  const deleteComment = (commentId: number) => {
    const currentComments = comments;

    setComments(prev => prev.filter(comm => comm.id !== commentId));

    postService.deleteComment(commentId)
      .catch(() => {
        setPostError(true);
        setComments(currentComments);
      });
  };

  const onAddComment = (comment: Comment) => {
    setComments(prev => [...prev, comment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoading && (<Loader />)}

          {!isLoading && postError && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {(!comments.length && !isLoading && !inputAccess && !postError) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(comments.length !== 0 && !isLoading) && (
            <>
              {!postError && (<p className="title is-4">Comments:</p>)}

              {!postError && comments.map(comment => (
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
                      onClick={() => deleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              )) }
            </>
          )}

          {!isLoading && !inputAccess && !postError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setInputAccess(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {inputAccess && (
          <NewCommentForm
            postId={post.id}
            onAddComment={onAddComment}
          />
        )}
      </div>
    </div>
  );
};
