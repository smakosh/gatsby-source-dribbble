'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const crypto = require(`crypto`);
const axios = require(`axios`);

exports.sourceNodes = (() => {
  var _ref = _asyncToGenerator(function* ({ actions: { createNode } }, { access_token }) {
    if (!access_token) {
        throw 'You need to get an access_token';
    }

    const axiosClient = axios.create({
        baseURL: `https://api.dribbble.com/v2/user/`,
    });

    // Thanks to https://github.com/LeKoArts/gatsby-source-behance/blob/master/gatsby-node.js
    const rateLimit = 60;
    let lastCalled = undefined;

    const rateLimiter = function rateLimiter(call) {
      const now = Date.now();
      if (lastCalled) {
        lastCalled += rateLimit;
        const wait = lastCalled - now;
        if (wait > 0) {
          return new Promise(function (resolve) {
            return setTimeout(function () {
              return resolve(call);
            }, wait);
          });
        }
      }
      lastCalled = now;
      return call;
    };

    axiosClient.interceptors.request.use(rateLimiter);

    let _ref2 = yield axiosClient.get(`/shots?per_page=100&access_token=${access_token}`);

    let user = yield axiosClient.get(`?access_token=${access_token}`);

    const jsonStringUser = JSON.stringify(user.data);

    _ref2.data.map(function (shot) {

      const jsonString = JSON.stringify(shot);

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
      createNode(shotListNode);
    });

    const userNode = {
      userID: user.data.id,
      name: user.data.name,
      username: user.data.login,
      bio: user.data.bio,
      avatar: user.data.avatar_url,
      location: user.data.location,
      url: user.data.html_url,
      links: user.data.links,
      created_at: user.data.created_at,
      can_upload: user.data.can_upload_shot,
      pro: user.data.pro,
      teams: user.data.teams,
      children: [],
      id: user.data.id.toString(),
      parent: `__SOURCE__`,
      internal: {
        type: `DribleUser`,
        contentDigest: crypto.createHash(`md5`).update(jsonStringUser).digest(`hex`)
      }
    };

    createNode(userNode);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();