import { Component, createElement as h } from "react";
import Error from "./Error.js";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return h(Error, { error: this.state.error });
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
