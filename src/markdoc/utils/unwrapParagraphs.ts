const unwrapParagraph = child => {
  if (child.name === 'Paragraph') {
    return child.children
  }

  return child
}

const unwrapParagraphs = children => children.map(unwrapParagraph).flat()

export default unwrapParagraphs
