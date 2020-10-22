import { Component, createElement as h } from "react";

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
      return h(
        "div",
        {},
        h("h2", {}, "Oh no! An error occurred."),
        h("p", {}, this.state.error.toString())
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
