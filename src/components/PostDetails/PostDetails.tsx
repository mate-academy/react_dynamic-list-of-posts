import { useEffect, useState } from 'react';

import { getCommentsByPostId } from '../../api/Comments';

import { Loader } from '../Loader/Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { CommentList } from '../CommentList/CommentList';

import { Post } from '../../types/Post';
import { Comment as CommentType } from '../../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isWritingComment, setIsWritingComment] = useState(false);

  useEffect(() => {
    setIsWritingComment(false);

    if (post) {
      setIsLoading(true);
      getCommentsByPostId(post.id)
        .then(setComments)
        .catch(() => setErrorMessage('Failed to load comments.'))
        .finally(() => setIsLoading(false));
    }
  }, [post]);

  const addNewComment = (newComment: CommentType) => {
    setComments(prev => [...prev, newComment]);
  };

  const deleteComment = (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post?.id}: {post?.title}
        </h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {errorMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            {errorMessage}
          </div>
        )}

        {post &&
          !isLoading &&
          !errorMessage &&
          (comments.length > 0 ? (
            <>
              <p className="title is-4">Comments:</p>
              <CommentList
                comments={comments}
                onCommentDelete={deleteComment}
              />
            </>
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ))}
      </div>

      {!isLoading &&
        !errorMessage &&
        (isWritingComment ? (
          <NewCommentForm
            selectedPostId={post?.id}
            onFormSubmit={addNewComment}
          />
        ) : (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsWritingComment(true)}
          >
            Write a comment
          </button>
        ))}
    </div>
  );
};
