import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { CommentItem } from './CommentItem';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
};
export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (!selectedPost.id) {
      return;
    }

    setIsLoadingComments(true);
    setIsCommentsError(false);

    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(setComments)
      .catch(() => setIsCommentsError(true))
      .finally(() => {
        setIsLoadingComments(false);
        setIsFormVisible(false);
      });
  }, [selectedPost.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>
          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {isCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {!isCommentsError && !isLoadingComments && (
            <>
              {comments.length ? (
                <>
                  <p className="title is-4">Comments:</p>
                  {comments.map(comment => (
                    <CommentItem
                      comment={comment}
                      key={comment.id}
                      setComments={setComments}
                    />
                  ))}
                </>
              ) : (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}
            </>
          )}
          {!isFormVisible && !isLoadingComments && !isCommentsError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && selectedPost.id && (
          <NewCommentForm postId={selectedPost.id} setComments={setComments} />
        )}
      </div>
    </div>
  );
};
