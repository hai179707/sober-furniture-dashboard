import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setNewBlogAuthor } from "~/actions/blog.actions"
import Card from "../Card"

function AddBlockPostAuthor() {
    const { newBlog: { author } } = useSelector(state => state.blogReducer)
    const { user } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setNewBlogAuthor(user))
        // eslint-disable-next-line
    }, [user])

    return (
        <Card>
            <p>Author: <span className="font-semibold">{author.displayName} (You)</span></p>
        </Card>
    )
}

export default AddBlockPostAuthor