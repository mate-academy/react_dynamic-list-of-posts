import React, { useEffect, useState } from 'react';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { NewCommentForm } from '../NewCommentForm';

import './PostDetails.scss';
import { Loader } from '../Loader';

type Props = {
  selectedPostId: number
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post>();
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [commentsHidden, setCommentsHidden] = useState(true);
  const [loading, setLoading] = useState(false);

  const updateComments = () => {
    getPostComments(selectedPostId)
      .then(commentsFromServer => setPostComments(commentsFromServer));
  };

  useEffect(() => {
    setLoading(true);
    getPostDetails(selectedPostId)
      .then(postFromServer => {
        setPost(postFromServer);
        updateComments();
        setLoading(false);
      });
  }, [selectedPostId]);

  useEffect(() => {
    updateComments();
  }, [postComments]);

  const onCommentDelete = (id: number) => {
    deleteComment(id);
    updateComments();
  };

  const onCommentAdd = (name: string, email: string, body: string) => {
    addComment(selectedPostId, name, email, body);
    updateComments();
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments.length > 0 && (
          <>
            <button
              type="button"
              className="button"
              onClick={() => setCommentsHidden(!commentsHidden)}
            >
              {`${commentsHidden ? 'Show' : 'Hide'} ${postComments.length} comments`}
            </button>

            {!commentsHidden && (
              <ul className="PostDetails__list">
                {postComments.map(postComment => (
                  <li key={postComment.id} className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => onCommentDelete(postComment.id)}
                    >
                      X
                    </button>
                    <p>{postComment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm onCommentAdd={onCommentAdd} />
        </div>
      </section>
    </div>
  );
};
