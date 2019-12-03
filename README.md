# gatsby-source-dribbble

Gatsby.js source plugin for loading data from Dribbble

This project is a refactor of [`gatsby-source-dribbble`](https://github.com/smakosh/gatsby-source-dribbble).

Learn more about [Gatsby](https://www.gatsbyjs.org/) and its plugins here: [https://www.gatsbyjs.org/docs/plugins/](https://www.gatsbyjs.org/docs/plugins/)

## Install

```sh
npm install gatsby-source-dribbble
```

or

```sh
yarn add gatsby-source-dribbble
```

## How to use

```Javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-source-dribbble',
    options: {
      // You can get your Access Token by following this tutorial: http://developer.dribbble.com/v2/oauth/
      access_token: '<< Your_Access_Token_here >>'
    }
  }
]
```

## GraphQL Queries

Get all your details

```graphql
{
  dribbbleUser {
    name
    username
    bio
    avatar
    location
    url
    links
    created_at
    can_upload
    pro
    teams
  }
}
```

Get all your shots

```graphql
{
  allDribbbleShot {
    nodes {
      id
      title
      description
      published
      updated
      url
      tags
      cover
      width
      height
      localCover {
        childImageSharp {
          fixed(width: 600) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
}
```
