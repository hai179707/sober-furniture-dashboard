import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addBlogPost } from "~/actions/blog.actions"
import AddBlogPostAuthor from "~/components/AddBlogPostAuthor"
import AddBlogPostFeaturedImage from "~/components/AddBlogPostFeaturedImage"
import AddBlogPostGeneral from "~/components/AddBlogPostGeneral"
import AddBlogPostVisibility from "~/components/AddBlogPostVisibility"
import Button from "~/components/Button"
import routes from "~/config/routes"

function AddBlogPost() {
    const { newBlog } = useSelector(state => state.blogReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSave = () => {
        dispatch(addBlogPost({
            ...newBlog,
            author: newBlog.author._id
        }, newBlogId => navigate(routes.blogPosts + '/' + newBlogId)))
    }

    return (
        <div className="px-2">
            <div className="flex justify-end py-5">
                <Button onClick={handleSave}>Save</Button>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-2/3 sm:pr-2">
                    <AddBlogPostGeneral />
                </div>
                <div className="w-full sm:w-1/3 sm:pl-2">
                    <AddBlogPostAuthor />
                    <AddBlogPostVisibility />
                    <AddBlogPostFeaturedImage />
                </div>
                <div className="w-full flex justify-end">
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default AddBlogPost