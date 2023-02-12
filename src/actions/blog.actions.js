import { CLEAR_NEW_BLOG_POST_DATA, GET_BLOGS, GET_BLOG_POST, OPEN_TOAST, SET_NEW_BLOG_AUTHOR, SET_NEW_BLOG_CONTENT, SET_NEW_BLOG_EXCERPT, SET_NEW_BLOG_FEATURED_IMAGE, SET_BLOG_LIMIT, SET_BLOG_PAGE, SET_NEW_BLOG_PATH, SET_NEW_BLOG_PUBLIC, SET_NEW_BLOG_TITLE, SET_BLOG_TOTAL, SET_BLOG_TITLE, SET_BLOG_CONTENT, SET_BLOG_EXCERPT, SET_BLOG_PUBLIC, SET_BLOG_FEATURED_IMAGE, SET_BLOG_AUTHOR, SET_BLOG_PATH } from '~/constants'

import * as blogPostServices from '~/services/blogPostServices'

export const getBlogPosts = (page = 1, limit = 20, query = '', visibility = '') => {
    return async dispatch => {
        try {
            const res = await blogPostServices.getBlogPosts(page, limit, query, visibility)
            if (res) {
                return dispatch({
                    type: GET_BLOGS,
                    data: res
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getBlogPost = blogPostId => {
    return async dispatch => {
        try {
            const res = await blogPostServices.getBlogPost(blogPostId)
            if (res) {
                return dispatch({
                    type: GET_BLOG_POST,
                    data: res
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteBlogPost = blogPostId => {
    return async dispatch => {
        try {
            const res = await blogPostServices.deleteBlogPost(blogPostId)
            if (res) {
                return dispatch({
                    type: GET_BLOG_POST,
                    data: null
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const addBlogPost = (data, action) => {
    return async dispatch => {
        if (!data.title) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Title is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.content) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Content is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.path) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Path is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.author) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'author is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.featuredImage) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Featured image is require!',
                    type: 'error'
                }
            })
        }
        else {
            try {
                const res = await blogPostServices.addBlogPost(data)
                if (res) {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Add blog post successfully!',
                            type: 'success'
                        }
                    })
                    dispatch({
                        type: CLEAR_NEW_BLOG_POST_DATA
                    })
                    if(action) action(res._id)
                }
                else {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Add blog post fail!',
                            type: 'error'
                        }
                    })
                }
            } catch (error) {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Add blog post fail!',
                        type: 'error'
                    }
                })
                console.log(error)
            }
        }
    }
}

export const updateBlogPost = data => {
    return async dispatch => {
        if (!data.title) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Title is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.content) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Content is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.path) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Path is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.author) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'author is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.featuredImage) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Featured image is require!',
                    type: 'error'
                }
            })
        }
        else {
            try {
                const res = await blogPostServices.updateBlogPost(data._id, data)
                if (res) {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Update blog post successfully!',
                            type: 'success'
                        }
                    })
                }
                else {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Update blog post fail!',
                            type: 'error'
                        }
                    })
                }
            } catch (error) {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Update blog post fail!',
                        type: 'error'
                    }
                })
                console.log(error)
            }
        }
    }
}

export const setBlogTitle = value => ({
    type: SET_BLOG_TITLE,
    value
})

export const setBlogContent = value => ({
    type: SET_BLOG_CONTENT,
    value
})

export const setBlogExcerpt = value => ({
    type: SET_BLOG_EXCERPT,
    value
})

export const setBlogPublic = value => ({
    type: SET_BLOG_PUBLIC,
    value
})

export const setBlogFeaturedImage = value => ({
    type: SET_BLOG_FEATURED_IMAGE,
    value
})

export const setBlogAuthor = value => ({
    type: SET_BLOG_AUTHOR,
    value
})

export const setBlogPath = value => ({
    type: SET_BLOG_PATH,
    value
})

export const setNewBlogTitle = value => ({
    type: SET_NEW_BLOG_TITLE,
    value
})

export const setNewBlogContent = value => ({
    type: SET_NEW_BLOG_CONTENT,
    value
})

export const setNewBlogExcerpt = value => ({
    type: SET_NEW_BLOG_EXCERPT,
    value
})

export const setNewBlogPublic = value => ({
    type: SET_NEW_BLOG_PUBLIC,
    value
})

export const setNewBlogFeaturedImage = value => ({
    type: SET_NEW_BLOG_FEATURED_IMAGE,
    value
})

export const setNewBlogAuthor = value => ({
    type: SET_NEW_BLOG_AUTHOR,
    value
})

export const setNewBlogPath = value => ({
    type: SET_NEW_BLOG_PATH,
    value
})

export const setBlogTotal = total => ({
    type: SET_BLOG_TOTAL,
    total
})

export const setBlogPage = page => ({
    type: SET_BLOG_PAGE,
    page
})

export const setBlogLimit = limit => ({
    type: SET_BLOG_LIMIT,
    limit
})