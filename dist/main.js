"use strict";
(() => {
  // src/services/jsx/jsx.ts
  function jsx(tag, props, ...children) {
    const element = typeof tag === "function" ? tag(props) : document.createElement(tag);
    for (const [name, value] of Object.entries(props || {})) {
      if (name.startsWith("on") && typeof value === "function") {
        element.addEventListener(name.slice(2).toLowerCase(), value);
      } else {
        element.setAttribute(name, value);
      }
    }
    children.forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((nestedChild) => element.append(nestedChild));
      } else {
        element.append(child instanceof Node ? child : document.createTextNode(child));
      }
    });
    return element;
  }

  // src/components/HelloWorld.tsx
  function HelloWorld() {
    return /* @__PURE__ */ jsx("div", { class: "hello" }, /* @__PURE__ */ jsx("h1", null, "Hello from TSX!"));
  }

  // src/main.ts
  document.body.appendChild(HelloWorld());
})();
