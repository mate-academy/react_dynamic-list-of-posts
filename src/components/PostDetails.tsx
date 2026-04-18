import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getComments } from '../utils/getData';
import { deleteComment } from '../utils/deleteData';

interface PostDetailsProps {
  post: Post;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasCommentsLoaded, setHasCommentsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [openNewCommentForm, setOpenNewCommentForm] = useState(false);

  useEffect(() => {
    getComments(post.id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setHasCommentsLoaded(true));

    return () => {
      setHasCommentsLoaded(false);
      setIsError(false);
      setOpenNewCommentForm(false);
    };
  }, [post]);

  const childComponent = () => {
    if (!hasCommentsLoaded) {
      return <Loader />;
    }

    if (isError) {
      return (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      );
    }

    return (
      <>
        <div className="block">
          {comments.length > 0 ? (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() =>
                        deleteComment(comment.id).then(() => {
                          setComments(prevComments =>
                            prevComments.filter(c => c.id !== comment.id),
                          );
                        })
                      }
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {hasCommentsLoaded && !openNewCommentForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenNewCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {openNewCommentForm && (
          <NewCommentForm
            postId={post.id}
            handleError={() => setIsError(true)}
            onCommentCreated={(newComment: Comment) =>
              setComments(prevComments => [...prevComments, newComment])
            }
          />
        )}
      </>
    );
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">#{`${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>
      {childComponent()}
    </div>
  );
};
