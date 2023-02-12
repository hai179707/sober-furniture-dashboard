import { useSelector } from "react-redux"
import BlogPostItem from "../BlogPostItem"

function BlogPostList() {
    const { blogs } = useSelector(state => state.blogReducer)

    return (
        <div className="mt-3">
            <div className="flex py-3 font-semibold">
                <div className="px-1 w-2/3">Title</div>
                <div className="px-1 w-1/3 sm:1/12 text-right sm:text-center">Author</div>
                <div className="px-1 w-1/4 text-center hidden sm:block">Date</div>
            </div>
            {!!blogs.length
                ?
            <>
                {blogs.map(blog => (
                    <BlogPostItem data={blog} key={blog._id} />
                ))}
            </>
            :
            <div className="text-center py-5">There are currently no articles available!</div>
            }
        </div>
    )
}

export default BlogPostList