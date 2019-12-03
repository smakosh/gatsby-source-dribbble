const axios = require("axios")
const { createFileNode } = require("./createFileNode")
const { generateUserNode, generateShotNode } = require("./generateNode")

exports.sourceNodes = async (
  { actions, store, cache, createNodeId },
  { access_token }
) => {
  const { createNode, touchNode } = actions

  if (!access_token) {
    throw "You need to get an access_token"
  }

  const axiosClient = axios.create({
    baseURL: "https://api.dribbble.com/v2/user/",
  })

  // Thanks to https://github.com/LeKoArts/gatsby-source-behance/blob/master/gatsby-node.js
  const rateLimit = 60
  let lastCalled = undefined

  const rateLimiter = call => {
    const now = Date.now()
    if (lastCalled) {
      lastCalled += rateLimit
      const wait = lastCalled - now
      if (wait > 0) {
        return new Promise(resolve => setTimeout(() => resolve(call), wait))
      }
    }
    lastCalled = now
    return call
  }

  axiosClient.interceptors.request.use(rateLimiter)

  // build the user node
  const userResponse = await axiosClient.get("/", { params: { access_token } })
  const userNode = generateUserNode(userResponse.data)
  createNode(userNode)

  // build the shot nodes
  const shotsResponse = await axiosClient.get("/shots", {
    params: { access_token, per_page: 100 },
  })
  for (const shot of shotsResponse.data) {
    const shotNode = generateShotNode(shot)
    shotNode.localCover___NODE = await createFileNode({
      id: shotNode.id,
      fileUrl: shotNode.cover,
      store,
      cache,
      createNode,
      createNodeId,
      touchNode,
    })
    createNode(shotNode)
  }
}
