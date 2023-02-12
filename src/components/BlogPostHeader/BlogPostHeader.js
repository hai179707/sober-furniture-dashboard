import { RiEyeLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { updateBlogPost } from "~/actions/blog.actions"
import Button from "../Button"

function BlogPostHeader() {
    const { blogPost } = useSelector(state => state.blogReducer)
    const dispatch = useDispatch()

    const handleSave = () => {
        dispatch(updateBlogPost({
            ...blogPost,
            author: blogPost.author._id
        }))
    }

    return (
        <div className="mb-5 flex justify-end gap-2">
            <a href={process.env.REACT_APP_WEBSITE_URL + '/blogs/' + blogPost.path} target='_blank' rel="noreferrer" className="bg-white border border-secondary-bg px-3 py-2 rounded flex gap-2 items-center">
                <RiEyeLine />
                <span>Preview</span>
            </a>
            <Button onClick={handleSave}>Save</Button>
        </div>
    )
}

export default BlogPostHeader