Make sure all pages in this directory (other than index.md) end with .mdpart, otherwise the site will not render properly.

Adding a markdoc file named 'appname.mdpart' will append extra information for that app page to the instructions from the API. If there are any headings in this markdoc file containing the word "configuration" (case-insensitive), the page will show that information in the markdoc file instead of the configuration from the API.

Any pages in this directory ending with `.md` or '.mdoc' will render as standalone pages without pulling any information from the API, and won't show up in the 'Applications' section of the side nav.