import React from 'react';
import { PostWithUser } from '../helpers/typeDefs';

type Props = {
  isLoading: boolean;
  errorMessage: string;
  posts: PostWithUser[];
  handleLoadClick: () => void;
};

const LoadingButtons: React.FC<Props> = (
  {
    isLoading, errorMessage, posts, handleLoadClick,
  },
) => {
  return (
    isLoading
      ? (
        <button className="btn btn-primary" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          Loading...
        </button>
      )
      : (
        <>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleLoadClick}
            hidden={posts.length !== 0}
          >
            <span role="status" aria-hidden="true" />
            Load
          </button>
          <p
            className="alert alert-primary mt5"
            hidden={errorMessage === ''}
            role="alert"
          >
            {`¯\\_(ツ)_/¯ ${errorMessage}`}
          </p>
        </>
      )
  );
};

export default LoadingButtons;
