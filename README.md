# gatsby-source-dribbble
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)<!-- ALL-CONTRIBUTORS-BADGE:END -->

> Gatsby.js source plugin for loading data from Dribbble

[![Support me on Patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/smakosh)

[![Package Version](https://img.shields.io/npm/v/gatsby-source-dribbble.svg?style=flat-square)](https://www.npmjs.com/package/gatsby-source-dribbble)
[![Package Downloads](https://img.shields.io/npm/dt/gatsby-source-dribbble.svg?style=flat-square)](https://www.npmjs.com/package/gatsby-source-dribbble)

Learn more about [Gatsby](https://www.gatsbyjs.org/) and its plugins here: [https://www.gatsbyjs.org/docs/plugins/](https://www.gatsbyjs.org/docs/plugins/)

**See it in live action on the [example site](https://dribbble-example.netlify.com)!**
[Source Code](https://github.com/smakosh/gatsby-source-dribbble-example) for the example site.

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.mitchellbutler.com"><img src="https://avatars1.githubusercontent.com/u/1069577?v=4" width="100px;" alt="Mitchell Butler"/><br /><sub><b>Mitchell Butler</b></sub></a><br /><a href="https://github.com/smakosh/gatsby-source-dribbble/commits?author=mitchellbutler" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!