# gatsby-source-dribbble
> Gatsby.js source plugin for loading your shots from Dribbble

Learn more about [Gatsby](https://www.gatsbyjs.org/) and its plugins here: [https://www.gatsbyjs.org/docs/plugins/](https://www.gatsbyjs.org/docs/plugins/)

## Install

```bash
npm install gatsby-source-dribbble
```

## How to use

```Javascript
// In your gatsby-config.js
plugins: [
    {
        resolve: `gatsby-source-dribbble`,
        options: {
            // You can get your Access Token by following this tutorial: http://developer.dribbble.com/v2/oauth/
            access_token: '<< Your_Access_Token_here >>'
        }
    }
]
```

## GraphQL Queries

Get all your shots

```graphql
{
    allDribleProjects {
        edges {
            node {
                title
                description
                id
                published
                updated
                url
                tags
                cover
                width
                height
            }
        }
    }
}
```