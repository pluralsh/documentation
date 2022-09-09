const withMarkdoc = require("@markdoc/next.js");

module.exports = withMarkdoc(
  /* config: https://markdoc.io/docs/nextjs#options */ {
    schemaPath: "./markdoc",
  }
)({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdoc"],
  async redirects() {
    return [
      { source: "/", destination: "/getting-started/readme", permanent: false },
    ];
  },
});
``;
