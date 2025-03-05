# Documentation Contributor Guide

This repository contains the [Plural](https://www.plural.sh) documentation site. The site is built using Next.js and features an automated system for routing, navigation, and redirects. This guide explains how to contribute effectively to the documentation.

## Getting Started

### Prerequisites

- Node.js 22.12.0 (recommended to use nvm)
- Yarn 3.6.0+

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd documentation

# Install dependencies
yarn install
```

### Development

```bash
# Start the development server
yarn dev

# Build for production
yarn build

# Start the production server
yarn start
```

## Documentation Structure

The documentation is organized in the `pages` directory. The directory structure automatically determines the navigation hierarchy and URL structure.

### File Naming Conventions

We use numeric prefixes to control the order of sections and pages:

```
pages/
├── 01-overview/
│   ├── 01-introduction.md
│   ├── 02-architecture.md
│   └── 03-api-reference.md
├── 02-getting-started/
│   ├── 01-first-steps/
│   │   ├── 01-cli-quickstart.md
│   │   └── 02-existing-cluster.md
│   └── 02-how-to-use.md
└── ...
```

- Numeric prefixes (`01-`, `02-`, etc.) determine order in navigation
- These prefixes are automatically stripped from URLs and navigation display
- Use lowercase and hyphens for file and directory names

### Index Pages

To create a section landing page, add an `index.md` file in the directory:

```
pages/
└── 03-plural-features/
    ├── index.md         # Landing page for the Plural Features section
    ├── 01-continuous-deployment.md
    └── ...
```

## Adding New Content

### Creating a New Page

1. Identify where your new page belongs in the hierarchy
2. Create a new Markdown file with the appropriate numeric prefix
3. Add frontmatter with at least a title (optional but recommended)
4. Write your content using Markdown and Markdoc syntax

Example:

```markdown
---
title: "My New Feature"
description: "How to use the new feature in Plural"
---

# My New Feature

This is the content for my new feature...
```

### Creating a New Section

1. Create a new directory with the appropriate numeric prefix
2. Add an `index.md` file with an overview of the section
3. Add individual pages within the section

### Frontmatter

Each Markdown file supports the following frontmatter:

```yaml
---
title: "Page Title"              # Used for navigation and HTML title
description: "Page description"  # Used for meta description and previews
---
```

## Linking to Other Pages

### Using DocLink Tags (Recommended)

The `doclink` tag provides the most robust way to link to other documentation pages, as it works even if the target page moves:

```markdown
Check out the {% doclink to="getting_started_first_steps" %}First Steps Guide{% /doclink %} to get started.
```

The `to` attribute refers to the route ID, which is automatically generated from the file path (with prefixes removed and slashes replaced by underscores).

### Using Regular Markdown Links

You can also use standard Markdown links:

```markdown
Check out the [First Steps Guide](/getting-started/first-steps) to get started.
```

Note that if the target page moves, these links will break unless they're updated.

## Moving or Renaming Pages

When you move or rename a page:

1. Use Git to move/rename the file:
   ```bash
   git mv old-path/file.md new-path/file.md
   ```

2. Run `yarn dev` - this will automatically:
   - Update the route registry
   - Create redirects from the old URL to the new URL
   - Update navigation structure

This automation ensures that links to the old location continue to work.

## Understanding Automated Systems

Several automated processes maintain the site's structure:

### Route Generation

- Executed during `yarn dev` and `yarn build`
- Scans Markdown files and generates a route registry
- Creates stable IDs for each page
- Outputs to `src/routes/docs.generated.ts`

### Navigation Generation

- Executed alongside route generation
- Creates a hierarchical menu structure based on directory structure
- Outputs to `src/routing/navigation.ts`

### Redirect Tracking

- Executed during `yarn dev`
- Detects moved or renamed files
- Updates redirects in `next.config.js`

### Page Indexing

- Creates a list of all pages with metadata
- Outputs to `src/generated/pages.json`

## Advanced Usage

### Adding Code Examples

Use triple backticks for code blocks with language highlighting:

```markdown
```javascript
// This is a code example
function example() {
  console.log('Hello world');
}
```
```

### Adding Images

Place images in the `public/images` directory and reference them:

```markdown
![Alt text](/images/example.png)
```

### Using Components in Markdown

The documentation supports custom components using Markdoc syntax:

```markdown
{% callout type="info" %}
This is an important note about this feature.
{% /callout %}
```

## Best Practices

1. **Use DocLink for internal links**: This ensures links remain valid even when pages move
2. **Test your changes**: Use `yarn dev` to preview changes before committing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes with `yarn dev`
5. Submit a pull request

When submitting changes, please:
- Provide a clear description of what you changed and why
- Follow the existing code style and conventions
- Ensure your changes don't break existing content

---

By following these guidelines, you'll help maintain a consistent, high-quality documentation site that provides value to Plural users. Thank you for your contributions!