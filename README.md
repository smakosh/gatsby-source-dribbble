## `@mitchellbutler/gatsby-source-dribbble`

Gatsby.js source plugin for loading data from Dribbble

Learn more about [Gatsby](https://www.gatsbyjs.org/) and its plugins here: [https://www.gatsbyjs.org/docs/plugins/](https://www.gatsbyjs.org/docs/plugins/)

### This project is a refactor of [`gatsby-source-dribbble`](https://github.com/smakosh/gatsby-source-dribbble). The changes in it have been submitted as a PR to the main project.

Here are the major differences:

1. Most shot cover images are now stored locally so that they can benefit from [Gatsby's image pipeline](https://www.gatsbyjs.org/docs/working-with-images/) (`gatsby-plugin-sharp`, `gatsby-transformer-sharp`, `gatsby-image`). This should make sites that use the plugin much lighter and faster.
2. The graphql nodes are now renamed from ~`DribleUser`~ to **`DribbbleUser`** and from ~`AllDribleProjects`~ to **`AllDribbbleShot`** for clarity and consistency with most other `gatsby-source-...` packages. This also future-proofs the naming convention in case that support is added for Dribbble projects (which are different from shots).
3. I've added configs for linting and Prettier, and moved dependencies like babel into the `package.json` to make contributing easier.

## Usage

### Install the Package

```sh
npm install @mitchellbutler/gatsby-source-dribbble
```

or

```sh
yarn add @mitchellbutler/gatsby-source-dribbble
```

### Get an Access Token

You can get your Access Token by following this tutorial: http://developer.dribbble.com/v2/oauth/

### Edit your Gatsby Config

```Javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: '@mitchellbutler/gatsby-source-dribbble',
    options: {
      access_token: 'YOUR_ACCESS_TOKEN'
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
