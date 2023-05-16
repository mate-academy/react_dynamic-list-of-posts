import React, { useState, useEffect } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/client';
import { formatComments } from '../utils/formatData';
import { CommentResponse } from '../types/CommentResponse';
import { Loader } from './Loader';
import { Comments } from './Comments';

type Props = {
  selectedPost: Post,
  setIsNewCommentForm: (value: boolean) => void,
  newComment: Comment | null,
  setNewComment: (value: null) => void,
  setIsCommentsError: (value: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  setIsNewCommentForm,
  newComment,
  setNewComment,
  setIsCommentsError,
}) => {
  const { id, title, body } = selectedPost;
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedPost) {
      setComments(null);
      setIsLoading(true);
      getPostComments(selectedPost.id)
        .then((res) => {
          setComments(formatComments(res as CommentResponse[]));
        })
        .catch(() => {
          setIsCommentsError(true);
        })
        .finally(() => {
          setIsLoading(() => false);
        });
    }
  }, [selectedPost]);

  useEffect(() => {
    if (newComment) {
      setComments(comments ? [...comments, newComment] : [newComment]);
      setNewComment(null);
    }
  }, [newComment]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id} ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}
          {(!isLoading && comments) && (
            <>
              {!comments.length
                ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                ) : (
                  <Comments
                    comments={comments}
                    setComments={setComments}
                    setIsCommentsError={setIsCommentsError}
                  />
                )}
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsNewCommentForm(true)}
              >
                Write a comment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
