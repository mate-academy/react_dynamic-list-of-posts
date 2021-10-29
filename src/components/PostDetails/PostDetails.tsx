import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPost } from '../../api/posts';
import { getComments, AddComment, DeleteComment } from '../../api/comments';
import './PostDetails.scss';

type Props = {
  selectedPost: string,
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [visibility, setVisibility] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getPost(selectedPost)
      .then(data => {
        const postFromServer = data;

        setPost(postFromServer);
      });
    getComments(selectedPost)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
      });
    setVisibility(true);
  }, [selectedPost]);

  const AddCommentAfterSubmit = (newComment: Partial<Comment>) => {
    AddComment(newComment)
      .then(addedComment => {
        setComments(prev => [...prev, addedComment]);
      });
  };

  return !selectedPost
    ? (
      <div className="PostDetails">
        <h2> Please, select one of posts</h2>
      </div>
    )
    : (
      <div className="PostDetails">
        <h2>Post details:</h2>
        {post !== null && (
          <section className="PostDetails__post">
            <p>{post.body}</p>
          </section>
        )}

        <section className="PostDetails__comments">
          {comments.length > 0 && (
            <button
              type="button"
              className="button"
              onClick={() => setVisibility(prev => !prev)}
            >
              {`${visibility ? 'Hide' : 'Show'} ${comments.length} comments`}
            </button>
          )}

          {visibility && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      DeleteComment(comment.id);
                      setComments(prev => prev
                        .filter(prevComment => prevComment.id !== comment.id));
                    }}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm
              selectedPost={selectedPost}
              AddCommentAfterSubmit={AddCommentAfterSubmit}
            />
          </div>
        </section>
      </div>
    );
};
