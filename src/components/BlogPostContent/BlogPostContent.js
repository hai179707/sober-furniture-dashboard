import BlockPostAuthor from "../BlogPostAuthor/BlogPostAuthor"
import BlogPostFeaturedImage from "../BlogPostFeaturedImage"
import BlogPostGeneral from "../BlogPostGeneral"
import BlogPostVisibility from "../BlogPostVisibility"

function BlogPostContent() {

    return (
        <div className="flex flex-wrap">
            <div className="w-full sm:w-2/3 sm:pr-2">
                <BlogPostGeneral />
            </div>
            <div className="w-full sm:w-1/3 sm:pl-2">
                <BlockPostAuthor />
                <BlogPostVisibility />
                <BlogPostFeaturedImage />
            </div>
        </div>
    )
}

export default BlogPostContent