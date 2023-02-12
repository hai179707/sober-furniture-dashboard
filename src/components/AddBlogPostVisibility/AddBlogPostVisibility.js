import { useDispatch, useSelector } from "react-redux"
import { setNewBlogPublic } from "~/actions/blog.actions"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function AddBlogPostVisibility() {
    const { newBlog: {public: isPublic} } = useSelector(state => state.blogReducer)
    const dispatch = useDispatch()

    return (
        <Card>
            <CardHeader>
                <p className="font-semibold">Visibility</p>
            </CardHeader>
            <CardBody>
                <div className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type='radio' id='visible' name="public" checked={isPublic === true} value={true} onChange={() => dispatch(setNewBlogPublic(true))} />
                    <label htmlFor="visible">Visible</label>
                </div>
                <div className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type='radio' id='hidden' name="public" checked={isPublic === false} value={false} onChange={() => dispatch(setNewBlogPublic(false))} />
                    <label htmlFor="hidden">Hidden</label>
                </div>
            </CardBody>
        </Card>
    )
}

export default AddBlogPostVisibility