import type { GatsbyConfig } from "gatsby";

const path = require('path');

const siteUrl = process.env.URL || `http://localhost:8000`

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Builder Gatsby App`,
    siteUrl: `http://localhost:8000`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allBuilderModels {
            page {
              content{
                data{
                  url
                }
              }
            }
          }
          site {
            siteMetadata {
              siteUrl
            }
          }
        }
      `,
        resolveSiteUrl: () => siteUrl,
        serialize: ({  site, allBuilderModels }) => {
          allBuilderModels.page.map(node => {
            return { url: `${site.siteMetadata.siteUrl}${node.content.data.url}`}
          })
        },  
      },
    },
    "gatsby-plugin-image",  {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    }, 
    "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },

    {
      resolve: '@builder.io/gatsby',
      options: {
        // Replace with your Public API Key
        publicAPIKey: '17149fd1734b43ad9d58a5f8295bb18f',
        templates: {
          // Render every `page` model as a new page using the
          // src/templates/page.jsx template based on the URL provided in Builder.io
          page: path.resolve('src/templates/page.tsx'),
        },
      },
    },
  ]
};

export default config;
