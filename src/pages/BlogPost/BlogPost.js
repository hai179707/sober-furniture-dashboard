import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getBlogPost } from "~/actions/blog.actions"
import BlogPostContent from "~/components/BlogPostContent"
import BlogPostFooter from "~/components/BlogPostFooter"
import BlogPostHeader from "~/components/BlogPostHeader"
import routes from "~/config/routes"

function BlogPost() {
    const { blogPostId } = useParams()
    const { blogPost } = useSelector(state => state.blogReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlogPost(blogPostId))
    }, [blogPostId, dispatch])

    return (
        <div className="px-2 py-3 text-sm">
            {blogPost
                ?
                <>
                    <BlogPostHeader />
                    <BlogPostContent />
                    <BlogPostFooter />
                </>
                :
                <div className="flex gap-1">
                    <div>Blog post does not exist or has been deleted - </div>
                    <Link to={routes.blogPosts} className='underline font-semibold'>Return blog posts</Link>
                </div>
            }
        </div>
    )
}

export default BlogPost