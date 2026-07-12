import { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorState from "./ErrorState";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-lg px-6 py-16">
          <ErrorState
            message="Something went wrong. Try reloading the page."
            onRetry={() => this.setState({ hasError: false })}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
