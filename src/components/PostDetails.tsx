import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentsList } from './CommentsList';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  useEffect(() => {
    setIsCommentFormVisible(false);
    setIsLoading(true);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then((response: Comment[]) => {
        setComments(response);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [post]);

  function handleDeleteComment(deletedComment: Comment) {
    const copyComments = [...comments];

    setComments(oldComments =>
      oldComments.filter(comment => comment !== deletedComment),
    );

    client.delete(`/comments/${deletedComment.id}`).catch(() => {
      setComments(copyComments);
    });
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!comments.length && !isLoading && !isError && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.length > 0 && !isLoading && (
          <CommentsList
            comments={comments}
            handleDelete={(deletedComment: Comment) =>
              handleDeleteComment(deletedComment)
            }
          />
        )}

        {!isCommentFormVisible && !isLoading && !isError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsCommentFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isCommentFormVisible && !isLoading && (
        <NewCommentForm
          postId={post.id}
          onSuccess={(newComment: Comment) =>
            setComments(oldComments => [...oldComments, newComment])
          }
        />
      )}
    </div>
  );
};
