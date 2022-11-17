Documentation site for [Plural](https://www.plural.sh/), the open-source, unified, application deployment platform that makes it easy to run open-source software on Kubernetes. Our marketplace has dozens of top tier applications ready to deploy.

Built with [Next.js](https://nextjs.org/) and [Markdoc](https://markdoc.dev/).

## Contributing

### Running the docs locally

To run the docs locally, you'll need to have yarn and node as prerequisites. Then run the following commands:

```shell
yarn # build the environment
yarn dev # run docs locally
```

### Adding a new document

All content can be located under the [pages](/pages) directory. The directory structure directly informs the website URL structure, so consider that when placing your new document.

All of our documents are in standard Markdown (.md) file format. If you are including an image, add it to [public/assets] using the same directory structure as pages.

Finally, make sure to add your new document to the NavData.tsx file located [here](/src/NavData.tsx).

### Updating structure

If you are making any changes to the documentation structure or organization, you'll likely need to set up page redirects. These can be added in [next.config.js](next.config.js). Make sure to 
look for internal usages throughout all the documents on the site to make sure that there are no broken links.