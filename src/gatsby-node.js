const crypto = require(`crypto`)
const axios = require(`axios`)

exports.sourceNodes = async ({ boundActionCreators: { createNode } }, { access_token }) => {
  if (!access_token) {
    throw 'You need to get an access_token'
  }

  const axiosClient = axios.create({
    baseURL: `https://api.dribbble.com/v2/user/`,
  })

  // Thanks to https://github.com/LeKoArts/gatsby-source-behance/blob/master/gatsby-node.js
  const rateLimit = 60
  let lastCalled = undefined

  const rateLimiter = (call) => {
    const now = Date.now()
    if (lastCalled) {
      lastCalled += rateLimit
      const wait = (lastCalled - now)
      if (wait > 0) {
        return new Promise((resolve) => setTimeout(() => resolve(call), wait))
      }
    }
    lastCalled = now
    return call
  }

  axiosClient.interceptors.request.use(rateLimiter)

  const { data } = await axiosClient.get(`/shots?per_page=100?access_token=${access_token}`)
  const { user } = await axiosClient.get(`?access_token=${access_token}`)

  const jsonStringUser = JSON.stringify(user)


  data.map(shot => {

    const jsonString = JSON.stringify(project)

    const shotListNode = {
      title: shot.title,
      description: shot.description,
      shotID: shot.id,
      published: shot.published_at,
      updated: shot.updated_at,
      url: shot.html_url,
      tags: shot.tags,
      cover: shot.images.hidpi,
      width: shot.width,
      height: shot.height,
      children: [],
      id: shot.id.toString(),
      parent: `__SOURCE__`,
      internal: {
        type: `DribleProjects`,
        contentDigest: crypto.createHash(`md5`).update(jsonString).digest(`hex`),
      },
    }
    createNode(shotListNode)

    const userNode = {
      userID: user.id,
      name: user.name,
      username: user.login,
      bio: user.bio,
      avatar: user.avatar_url,
      location: user.location,
      url: user.html_url,
      links: user.links,
      created_at: user.created_at,
      can_upload: user.can_upload_shot,
      pro: user.pro,
      teams: user.teams,
      children: [],
      id: user.id.toString(),
      parent: `__SOURCE__`,
      internal: {
        type: `DribleUser`,
        contentDigest: crypto.createHash(`md5`).update(jsonStringUser).digest(`hex`)
      }
    };

    createNode(userNode);
  })
}