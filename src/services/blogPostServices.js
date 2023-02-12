import * as httpRequest from '~/utils/httpRequest'

export const getBlogPosts = async (page = 1, limit = 20, query = '', visibility = '') => {
    try {
        const res = await httpRequest.get(`/blogs?page=${page}&limit=${limit}&query=${query}&visibility=${visibility}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getBlogPost = async blogPostId => {
    try {
        const res = await httpRequest.get('/blogs/' + blogPostId)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateBlogPost = async (blogPostId, data) => {
    try {
        const res = await httpRequest.put('/blogs/' + blogPostId, data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteBlogPost = async id => {
    try {
        const res = await httpRequest.deleteRequest('/blogs/' + id)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const addBlogPost = async data => {
    try {
        const res = await httpRequest.post('/blogs', data)
        return res
    } catch (error) {
        console.log(error)
    }
}