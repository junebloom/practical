import { createElement as h } from "react";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return h(
    "footer",
    { className: "d-flex justify-between align-center mt-1" },
    h(
      "address",
      null,
      "Created by ",
      h("a", { href: "https://github.com/junebloom" }, "June Bloom")
    ),
    h(
      "a",
      {
        href: "https://github.com/junebloom/practical",
        className: "d-flex align-center",
      },
      "See the source",
      h(FaGithub, { className: "ml-05 text-dark" })
    )
  );
}

export default Footer;
