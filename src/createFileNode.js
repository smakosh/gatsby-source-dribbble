// Adapted from the popular gatsby-source-instagram plugin.
// https://github.com/oorestisime/gatsby-source-instagram/blob/38e8653343b4d2939bf9c28f5366824656123b37/src/normalize.js

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createFileNode = async ({
  id,
  fileUrl,
  store,
  cache,
  createNode,
  createNodeId,
  touchNode,
}) => {
  let fileNodeID

  const mediaDataCacheKey = `dribbble-media-${id}`
  const cacheMediaData = await cache.get(mediaDataCacheKey)

  // If we have cached media data reuse
  // previously created file node to not try to redownload
  if (cacheMediaData) {
    fileNodeID = cacheMediaData.fileNodeID
    touchNode({
      nodeId: cacheMediaData.fileNodeID,
    })
  }

  // If we don't have cached data, download the file
  if (!fileNodeID) {
    try {
      const fileNode = await createRemoteFileNode({
        url: fileUrl,
        store,
        cache,
        createNode,
        createNodeId,
      })

      if (fileNode) {
        fileNodeID = fileNode.id

        await cache.set(mediaDataCacheKey, {
          fileNodeID,
        })
      }
    } catch (e) {
      console.log(`Could not download file "${fileUrl}"`, e)
    }
  }

  return fileNodeID
}
