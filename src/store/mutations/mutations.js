export default {
  fillPosts(state, posts) {
    state.posts = posts
  },
  fillPopularPosts(state, posts) {
    state.popularPosts = posts
  },
  fillPostTags(state, tags) {
    state.postTags = tags
  },
  setPostPageTotal(state, pageTotal) {
    state.postPageTotal = pageTotal
  },
  fillPost(state, data) {
    state.post = data
  },
  fillFriends(state, list) {
    state.friends = list
  }
}