// Return a VDOM node object
function h(tag, props, children) {
  return { tag, props, children }
}

// Return a DOM node from the provided VDOM node object; or return a string for VDOM text nodes
function createNode(node) {
  if (!node.tag) return node
  const { tag, props, children } = node
  const element = document.createElement(tag)
  for (let [key, value] of Object.entries(props)) {
    element[key] = value
  }
  element.append(...children.map(child => createNode(child)))
  return element
}

// Compare shallow equality between two VDOM nodes, including text nodes
function equals(a, b) {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (!a.tag && a !== b) return false
  if (a.tag !== b.tag) return false
  const keys = new Set([...Object.keys(a.props), ...Object.keys(b.props)])
  for (const key of keys) {
    if (a.props[key] !== b.props[key]) return false
  }
  return true
}

// Render the given VDOM node b, into the DOM node parent, based on the diff from a to b
function render(parent, a, b, index = 0) {
  // Added
  if (!a) {
    const node = createNode(b)
    parent.append(node)
    if (node.lifecycle && node.lifecycle.create) node.lifecycle.create(node)
  }
  // Removed
  else if (!b) {
    const node = parent.childNodes[index]
    if (node.lifecycle && node.lifecycle.delete) node.lifecycle.delete(node)
    node.remove()
  }
  // Changed
  else if (!equals(a, b)) {
    const node = parent.childNodes[index]
    if (node.lifecycle && node.lifecycle.delete) node.lifecycle.delete(node)
    node.replaceWith(createNode(b))
    if (node.lifecycle && node.lifecycle.create) node.lifecycle.create(node)
  }
  // Recurse
  else if (b.tag) {
    const length = Math.max(a.children.length, b.children.length)
    for (let i = 0; i < length; i++) {
      render(parent.childNodes[index], a.children[i], b.children[i], i)
    }
  }
}

export { h, render }
