import { CLEAR_NEW_BLOG_POST_DATA, GET_BLOGS, GET_BLOG_POST, SET_NEW_BLOG_AUTHOR, SET_NEW_BLOG_CONTENT, SET_NEW_BLOG_EXCERPT, SET_NEW_BLOG_FEATURED_IMAGE, SET_BLOG_LIMIT, SET_BLOG_PAGE, SET_NEW_BLOG_PATH, SET_NEW_BLOG_PUBLIC, SET_NEW_BLOG_TITLE, SET_BLOG_TOTAL, SET_BLOG_TITLE, SET_BLOG_CONTENT, SET_BLOG_EXCERPT, SET_BLOG_PUBLIC, SET_BLOG_FEATURED_IMAGE, SET_BLOG_AUTHOR, SET_BLOG_PATH } from "~/constants"

const initialState = {
    blogs: [],
    blogPost: null,
    newBlog: {
        title: '',
        content: '',
        excerpt: '',
        public: true,
        featuredImage: '',
        author: '',
        path: ''
    },
    total: 0,
    page: 1,
    limit: 20
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BLOGS:
            state.blogs = action.data.data
            state.total = action.data.total
            break

        case GET_BLOG_POST:
            state.blogPost = action.data
            break

        case CLEAR_NEW_BLOG_POST_DATA:
            state.newBlog = {
                title: '',
                content: '',
                excerpt: '',
                public: true,
                featuredImage: '',
                author: '',
                path: ''
            }
            break

        case SET_BLOG_TITLE:
            state.blogPost.title = action.value
            break

        case SET_BLOG_CONTENT:
            state.blogPost.content = action.value
            break

        case SET_BLOG_EXCERPT:
            state.blogPost.excerpt = action.value
            break

        case SET_BLOG_PUBLIC:
            state.blogPost.public = action.value
            break

        case SET_BLOG_FEATURED_IMAGE:
            state.blogPost.featuredImage = action.value
            break

        case SET_BLOG_AUTHOR:
            state.blogPost.author = action.value
            break

        case SET_BLOG_PATH:
            state.blogPost.path = action.value
            break

        case SET_NEW_BLOG_TITLE:
            state.newBlog.title = action.value
            break

        case SET_NEW_BLOG_CONTENT:
            state.newBlog.content = action.value
            break

        case SET_NEW_BLOG_EXCERPT:
            state.newBlog.excerpt = action.value
            break

        case SET_NEW_BLOG_PUBLIC:
            state.newBlog.public = action.value
            break

        case SET_NEW_BLOG_FEATURED_IMAGE:
            state.newBlog.featuredImage = action.value
            break

        case SET_NEW_BLOG_AUTHOR:
            state.newBlog.author = action.value
            break

        case SET_NEW_BLOG_PATH:
            state.newBlog.path = action.value
            break

        case SET_BLOG_TOTAL:
            state.total = action.total
            break

        case SET_BLOG_PAGE:
            state.page = action.page
            break

        case SET_BLOG_LIMIT:
            state.limit = action.limit
            break

        default:
            break
    }

    return { ...state }
}

export default blogReducer
