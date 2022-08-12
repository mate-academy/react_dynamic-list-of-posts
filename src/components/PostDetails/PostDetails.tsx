import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { getPosts } from '../../api/posts';
import { CommentList } from '../CommentList/CommentList';
import './PostDetails.scss';

type Props = {
  showDetails: number;
};

export const PostDetails: React.FC <Props> = ({ showDetails }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [commentsToPost, setCommentsToPost] = useState<Comment[]>([]);

  useEffect(() => {
    getPosts(showDetails)
      .then(res => {
        if (res.body) {
          setPostDetails(res);
        }
      })
      // eslint-disable-next-line no-console
      .catch(err => console.warn(err));
  }, []);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {
        postDetails && (
          <>
            <section className="PostDetails__post">
              <p>{postDetails.body}</p>
            </section>

            <CommentList
              postId={postDetails.id}
              commentsToPost={commentsToPost}
              setCommentsToPost={setCommentsToPost}
            />

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  postId={postDetails.id}
                  setCommentsToPost={setCommentsToPost}
                />
              </div>
            </section>
          </>
        )
      }
    </div>
  );
};
