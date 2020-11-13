import model from '../../model/client-model'

const handleError = (err) => {
  // handle error
  if (err.code === 401) {
    console.log('请登录后进行操作')
  }
}

export default {
  fetchPosts({ commit }, { page, limit }) {
    return model
      .getAllPosts(page, limit)
      .then(data => {
        commit('fillPosts', data.list)
        commit('setPostPageTotal', data.total)
      })
      .catch(err => {
        handleError(err)
      })
  },
  fetchPost({ commit }, { id }) {
    return model
      .getPost(id)
      .then(data => {
        commit('fillPost', data)
        return data
      })
  },
  fetchPopularPosts({ commit }) {
    return model.getPopularPosts().then(data => {
      commit('fillPopularPosts', data)
    })
  },
  fetchPostTags( { commit }) {
    return model.getPostTags().then(data => {
      commit('fillPostTags', data)
    })
  },
  fetchWorks({ commit }) {
    return model.getWorks()
      .then(data => {
        return data
      })
  },
  fetchFriends({ commit }) {
    return model.getFriends()
      .then(data => {
        commit('fillFriends', data)
      })
  }
}