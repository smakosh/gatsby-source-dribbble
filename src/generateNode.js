const crypto = require("crypto")

const createDigest = datum =>
  crypto
    .createHash("md5")
    .update(JSON.stringify(datum))
    .digest("hex")

exports.generateShotNode = shot => ({
  id: shot.id.toString(),
  title: shot.title,
  description: shot.description,
  published: shot.published_at,
  updated: shot.updated_at,
  url: shot.html_url,
  tags: shot.tags,
  cover: shot.images.hidpi,
  width: shot.width,
  height: shot.height,
  children: [],
  parent: "__SOURCE__",
  internal: {
    type: "DribbbleShot",
    contentDigest: createDigest(shot),
  },
})

exports.generateUserNode = user => ({
  id: user.id.toString(),
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
  parent: "__SOURCE__",
  internal: {
    type: "DribbbleUser",
    contentDigest: createDigest(user),
  },
})
