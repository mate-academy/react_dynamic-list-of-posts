import React, { useEffect, useState } from 'react';
import { deleteComment, getComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
} | null;

type Comment = {
  id: number;
  body: string;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsVisible, setCommentsVisible] = useState(true);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(response => {
        setPost(response);
      });
  }, [selectedPostId]);

  useEffect(() => {
    getComments(selectedPostId)
      .then(responce => {
        setComments(responce);
      });
  }, [selectedPostId, trigger]);

  useEffect(() => {
    setCommentsVisible(true);
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {post?.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        {comments.length !== 0 && (
          <>
            <button
              type="button"
              className="button"
              onClick={() => {
                setCommentsVisible(!commentsVisible);
              }}
            >
              {(commentsVisible) ? 'Hide ' : 'Show '}
              {comments.length}
              {' comment'}
              {((comments.length > 1) ? 's' : '')}
            </button>
          </>
        )}

        {commentsVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteComment(comment.id);
                    setComments(prev => (prev.filter(el => el.id !== comment.id)));
                  }}
                >
                  X
                </button>
                <p>
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            trigger={trigger}
            setTrigger={setTrigger}
          />
        </div>
      </section>
    </div>
  );
};
