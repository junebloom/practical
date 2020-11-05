import { createElement as h } from "react";

function Error({ error }) {
  return h(
    "div",
    null,
    h("h1", null, "Uh oh! Something went wrong."),
    h("h2", null, error.name),
    h("p", null, error.message)
  );
}

export default Error;
