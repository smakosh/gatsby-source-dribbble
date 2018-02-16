const crypto = require(`crypto`)
const axios = require(`axios`)

exports.sourceNodes = async ({ boundActionCreators: { createNode } }, { access_token }) => {
  if (!access_token) {
    throw 'You need to get an access_token'
  }

  const axiosClient = axios.create({
    baseURL: `https://api.dribbble.com/v2/user/`,
  })

  const rateLimit = 500
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

  const { data } = await axiosClient.get(`/shots?access_token=${access_token}`)


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
  })
}