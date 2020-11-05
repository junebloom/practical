import { createElement as h } from "react";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return h(
    "footer",
    { className: "d-flex mt-1" },
    h("strong", null, "Practical,"),
    h(
      "address",
      { className: "ml-05" },
      "created by ",
      h("a", { href: "https://junebloom.github.io" }, "Juniper Bloom")
    ),
    h("span", { className: "flex-grow" }),
    h(
      "a",
      {
        href: "https://github.com/junebloom/practical",
        className: "d-flex",
      },
      h(FaGithub, { className: "ml-05 text-darker" })
    )
  );
}

export default Footer;
