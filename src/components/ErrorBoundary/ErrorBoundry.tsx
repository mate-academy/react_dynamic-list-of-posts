import { Component, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // eslint-disable-next-line
  constructor(props: Props) {
    super(props);
  }

  state = { hasError: false };

  componentDidCatch(): void {
    this.setState({ hasError: true });
  }

  handleResetError = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? (
      <>
        <h1 style={{ textAlign: 'center', margin: '3rem', fontSize: '5rem' }}>
          Sorry.. there was an error
        </h1>
        <button
          className="button"
          type="button"
          onClick={this.handleResetError}
          style={{ margin: '4rem auto' }}
        >
          Reset Error
        </button>
      </>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
