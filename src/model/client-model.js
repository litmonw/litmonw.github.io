import axios from 'axios'
import { createError } from './util'

const request = axios.create({
  baseURL: '/api',
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(res => {
      const data = res.data
      if (!data) {
        return reject(createError(400, 'no data'))
      }

      if (data.error) {
        return reject(createError(400, data.message))
      }

      return resolve(data.data)
    }).catch(err => {
      const res = err.response
      if (res.status === 401) {
        reject(createError(401, 'need auth'))
      }
    })
  })
}

export default {
  getAllPosts(page, limit) {
    return handleRequest(
      request.get('/post/list', {
        params: {
          page,
          limit,
        },
      })
    )
  },
  getPost(id) {
    return handleRequest(
      request.get('/post/detail', {
        params: {
          id
        }
      })
    )
  },
  getPopularPosts() {
    return handleRequest(
      request.get('/post/popular/random', {
        params: {
          amount: 5
        }
      })
    )
  },
  getPostTags() {
    return handleRequest(
      request.get('/post/tag/random', {
        params: {
          amount: 5
        }
      })
    )
  },
  getWorks(page, limit) {
    return handleRequest(
      request.get('/project/list', {
        params: {
          page,
          limit
        }
      })
    )
  },
  getFriends() {
    return handleRequest(
      request.get('/friends/list')
    )
  }
}